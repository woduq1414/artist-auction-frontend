'use client'
import Image from "next/image";
import Link from "next/link";
import { usePathname, useRouter, useSearchParams } from 'next/navigation'
import { useCategory } from "../_store/useCategory";
import { useEffect, useState } from "react";

import { ArrowLeftIcon, ArrowRightIcon, MagnifyingGlassIcon, PaperClipIcon, PencilIcon, PencilSquareIcon, Squares2X2Icon, TrashIcon } from "@heroicons/react/24/solid";
import { QueueListIcon, } from "@heroicons/react/24/solid";
import { PhotoIcon } from "@heroicons/react/24/outline";
import Config from "@/config/config.export";
import { get, set } from "lodash";
import Skeleton from "react-loading-skeleton";
import React from "react";
import { dateDiffToKor } from "../_common/date";
import { useAuth } from "../_store/useAuth";
import { Cookies } from "react-cookie";
import Cropper, { ReactCropperElement } from "react-cropper";
import "cropperjs/dist/cropper.css";
import { PaperAirplaneIcon } from "@heroicons/react/24/outline";
import { useImageModal } from "../_store/useImageModal";




export default function MyPage() {

    let chattingInputRef = React.createRef<HTMLTextAreaElement>();

    // const data = await Data();
    // console.log(data);
    const { checkAuth, isLogin, profileImage, nickname, id, accountType, chattingList, setChattingList, selectedChattingRoom, setSelectedChattingRoom, chattingRoomList, setChattingRoomList, setChatCount, chatCount } = useAuth();
    const { modalImage, setModalImage } = useImageModal();

    const [goodsList, setGoodsList] = useState(undefined) as any;
    const [dealList, setDealList] = useState(undefined) as any;

    const [tempProfileImage, setTempProfileImage] = useState(undefined) as any;
    const [tempProfileImageTitle, setTempProfileImageTitle] = useState(undefined) as any;
    const [isUploadingProfileImage, setIsUploadingProfileImage] = useState(false) as any;

    const [isFetchingChattingList, setIsFetchingChattingList] = useState(false) as any;

    const chattingImageUploaderRef = React.createRef<HTMLInputElement>();
    const chattingFileUploaderRef = React.createRef<HTMLInputElement>();


    let chatContainerRef = React.createRef<HTMLDivElement>();

    async function sendFile(file: any, type: string = "image") {

        const formData = new FormData();

        formData.append('files', file);

        console.log(URL.createObjectURL(file));



        let res;
        if (type === "image") {
            setChattingList([...chattingList, {
                "sender": "me",
                "message": URL.createObjectURL(file),
                "type": type,
                "created_at": Date.now()
            }]);
            res = await fetch(Config().baseUrl + '/image/', {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
                body: formData
            })

        } else if (type === "file") {
            setChattingList([...chattingList, {
                "sender": "me",
                "message": {
                    "url": URL.createObjectURL(file),
                    "name": file.name
                },
                "type": type,
                "created_at": Date.now()
            }]);
            res = await fetch(Config().baseUrl + '/file/', {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
                body: formData
            })
        } else {
            return;
        }


        if (res.status !== 200) return;

        let data = await res.json();

        let chattingFile = {
            url: type === "image" ? data.data[0].media.link : data.data[0].link,
            id: data.data[0].id
        }


        let chatting = await addChatting(selectedChattingRoom.targetId, {
            "type": type,
            "message": chattingFile.id
        });




    }


    async function getChattingRoomList() {
        const res = await fetch(Config().baseUrl + '/chatting/list',
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );

        if (res.status !== 200) {
            return;
        }
        const data = await res.json();


        if (accountType === "artist") {
            setChattingRoomList(
                data.data.map((chatting: any) => (
                    {
                        "targetId": chatting.company.id,
                        "targetNickname": chatting.company.nickname,
                        "targetProfileImage": chatting.company.profile_image ? chatting.company.profile_image.media.path : undefined,
                        "lastMessage": chatting.last_message ? chatting.last_message : "",
                        "unreadCount": chatting.unread_count ? chatting.unread_count : 0

                    }
                ))
            );
        } else if (accountType === "company") {
            setChattingRoomList(
                data.data.map((chatting: any) => (
                    {
                        "targetId": chatting.artist.id,
                        "targetNickname": chatting.artist.nickname,
                        "targetProfileImage": chatting.artist.profile_image ? chatting.artist.profile_image.media.path : undefined,
                        "lastMessage": chatting.last_message ? chatting.last_message : "",
                        "unreadCount": chatting.unread_count ? chatting.unread_count : 0
                    }
                ))
            );
        }
    }

    async function getChattingList(targetId: string) {

        setIsFetchingChattingList(true);
        const res = await fetch(Config().baseUrl + '/chatting/' + targetId,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();

        if (res.status !== 200) {

            setIsFetchingChattingList(false);
            return;
        }
        setChattingList(data.data.content);



        setIsFetchingChattingList(false);

    }


    async function makeChattingRoom(targetId: string) {


        const res = await fetch(Config().baseUrl + '/chatting/' + targetId,
            {
                method: 'POST',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();
        console.log(data);
        // setSelectedChattingRoom(data.data);
        // getChattingList(targetId);
    }


    async function addChatting(targetId: string, data: any) {
        const res = await fetch(Config().baseUrl + '/chatting/' + targetId,
            {
                method: 'PUT',
                headers: {
                    'Content-Type': 'application/json',
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
                body: JSON.stringify(data)
            }

        );
        const resData = await res.json();
        console.log(resData);
        // getChattingList(targetId);
        return resData;
    }




    const router = useRouter();
    const queryString = useSearchParams();

    async function getProfile(type: string, userId: string) {
        const res = await fetch(Config().baseUrl + '/auth/profile/' + type + '/' + userId,
            {
                method: 'GET',
                headers: {
                    'Accept': 'application/json',
                    "Authorization": "Bearer " + new Cookies().get('accessToken')
                },
            }

        );
        const data = await res.json();
        console.log(data.data)
        return data.data;
    }

    async function getTargetProfile() {
        const artistId = queryString.get("artistId")
        const companyId = queryString.get("companyId")
        if (artistId) {

            let targetProfile = await getProfile("artist", artistId)
            await getChattingList(artistId);
            setSelectedChattingRoom({
                "targetId": queryString.get("artistId"),
                "targetNickname": targetProfile.nickname,
                "targetProfileImage": targetProfile.profile_image ? targetProfile.profile_image.media.path : undefined,
                "lastMessage": "",
                "unreadCount": 0
            });

        } else if (companyId) {
            let targetProfile = await getProfile("company", companyId)
            await getChattingList(companyId);
            setSelectedChattingRoom({
                "targetId": queryString.get("companyId"),
                "targetNickname": targetProfile.nickname,
                "targetProfileImage": targetProfile.profile_image ? targetProfile.profile_image.media.path : undefined,
                "lastMessage": "",
                "unreadCount": 0
            });
        }

    }

    useEffect(() => {

        getTargetProfile();


    }, []);

    useEffect(() => {
        getChattingRoomList();



        setChattingList([
            // {
            //     "sender": "me",
            //     "type": "text",
            //     "message": "안녕하세요",
            //     "createdAt": "2021-07-22T14:00:00.000Z"
            // }
        ])

    }, [accountType]);

    useEffect(() => {
        import('preline/preline').then((module) => {

            const { HSStaticMethods, HSSelect, HSOverlay } = module;
            // type HSSelect = import('preline/preline').HSSelect;

            HSStaticMethods.autoInit(['tooltip']);

        });
        if (chatContainerRef.current) {
            chatContainerRef.current.scrollTop = chatContainerRef.current.scrollHeight;

        }

        // update last_message at chattingRoomList
        if (chattingList && chattingList.length > 0) {
            if (chattingList[chattingList.length - 1].sender !== 'me') {
                return;
            }
            const newChattingRoomList = chattingRoomList.map((chattingRoom: any) => {
                if (selectedChattingRoom && chattingRoom.targetId === selectedChattingRoom.targetId) {
                    const lastMessage = chattingList[chattingList.length - 1].type === "text" ? chattingList[chattingList.length - 1].message : (
                        chattingList[chattingList.length - 1].type === "image" ? "사진을 보냈습니다." : "파일을 보냈습니다."
                    );
                    return {
                        ...chattingRoom,
                        "lastMessage": lastMessage
                    }
                } else {
                    return chattingRoom;
                }
            });

            setChattingRoomList(newChattingRoomList);
        }


    }, [chattingList]);

    async function submitChatting() {
        // if (chattingInputRef === null || chattingInputRef.current === null) {
        //     return;
        // }
        const chattingInput = document.getElementById("chattingInput") as HTMLTextAreaElement;
        const chattingInputValue = chattingInput.value;

        if (chattingInputValue.replaceAll(" ", "") === '') {
            return;
        }

        if (!selectedChattingRoom.lastMessage) {
            await makeChattingRoom(selectedChattingRoom.targetId);
            await getChattingRoomList();
        }


        // const data = {
        //     "type": "text",
        //     "data": chattingInputRef.current.value
        // }

        addChatting(selectedChattingRoom.targetId, {
            "type": "text",
            "message": chattingInputValue
        });

        setChattingList([...chattingList, {
            "sender": "me",
            "message": chattingInputValue,
            "type": "text",
            "created_at": Date.now()
        }]);

        chattingInput.value = '';


    }

    return (
        <main className="w-[100%] h-full mx-auto mt-20 md:mt-16  flex flex-col">
            {/* <div className="mx-auto mt-6 text-4xl font-bold">
      </div> */}
            <div className="w-[80%] mx-auto h-full">
                <div className="flex flex-row w-[100%] mt-10 h-full bg-white min-h-[80vh] shadow-md ">
                    <div className="w-[350px]  flex-shrink-0 bg-slate-50 flex flex-col items-center">
                        {
                            chattingRoomList.map((chatting: any, index: any) => {
                                return (
                                    <div className="flex flex-row items-center w-full py-3 pl-5 pr-5 border-b border-gray-300 cursor-pointer hover:bg-gray-100" onClick={() => {
                                        setChatCount(
                                            chatCount - chattingRoomList[index].unreadCount
                                        )

                                        chattingRoomList[index].unreadCount = 0;

                                        setSelectedChattingRoom(chatting);
                                        getChattingList(chatting.targetId);

                                    }} key={
                                        chatting.targetId

                                    }>
                                        <img
                                            className="flex-shrink-0 w-12 h-12 mr-2 rounded-full"
                                            src={chatting.targetProfileImage ? chatting.targetProfileImage : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"}
                                        />
                                        <div className="flex flex-col items-start flex-grow w-[70%]">
                                            <div className="text-lg font-semibold text-gray-800">
                                                {chatting.targetNickname}
                                            </div>
                                            <div className="max-w-[90%] text-sm text-gray-500 truncate">
                                                {chatting.lastMessage}
                                            </div>
                                        </div>
                                        <div className="flex flex-col items-center justify-center ml-auto">
                                            <div className={`px-2 py-1 text-xs text-center text-white rounded-full bg-primary-light
                                                ${chatting.unreadCount === 0 ? 'hidden' : ''}
                                                `}>
                                                {chatting.unreadCount}
                                            </div>
                                        </div>
                                    </div>
                                );
                            })
                        }


                    </div>
                    <div className="flex flex-col w-full">
                        {
                            selectedChattingRoom ? <div className="flex flex-col h-full" onPaste={(event) => {
                                const items = event.clipboardData.items;

                                for (let i = 0; i < items.length; i++) {
                                    if (items[i].type.indexOf("image") !== -1) {
                                        const blob = items[i].getAsFile();
                                        sendFile(blob);

                                        break;
                                    }
                                }
                            }}>
                                <div className="flex items-center justify-between flex-shrink-0 w-full px-5 py-3 text-xl bg-slate-50">
                                    <div>
                                        <ArrowLeftIcon className="w-5 h-5 cursor-pointer" onClick={() => setSelectedChattingRoom(undefined)} />
                                    </div>

                                    <div>
                                        {
                                            `${selectedChattingRoom.targetNickname}님과의 대화`
                                        }

                                    </div>
                                    <div />
                                </div>
                                <div className="flex flex-col flex-grow px-6 py-3 overflow-y-auto max-h-[calc(100vh-300px)]" ref={chatContainerRef}>
                                    {
                                        isFetchingChattingList ? <div className="flex flex-col items-center justify-center w-full h-full bg-white">
                                            <Skeleton containerClassName="flex-1" height={300} />
                                        </div> : chattingList.map((chatting: any, index: any) => {
                                            if (chatting.sender === 'me') {
                                                return (

                                                    <div className="flex flex-row justify-end w-full mb-1 group" key={
                                                        chatting.created_at

                                                    }>
                                                        <div className="flex flex-row items-end justify-end">
                                                            {/* Card */}

                                                            <span className="z-10 inline-block px-2 py-1 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 ">

                                                                {
                                                                    (() => {
                                                                        let date = new Date(chatting.created_at);
                                                                        return date.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit', 'day': '2-digit', 'month': '2-digit', 'year': 'numeric' })
                                                                    })()
                                                                }
                                                            </span>
                                                            {
                                                                chatting.type == "text" ?
                                                                    <div className="max-w-[75%] px-3 py-2 text-white shadow-sm bg-primary rounded-2xl break-all whitespace-pre-wrap">
                                                                        {chatting.message}
                                                                    </div> : chatting.type == "image" ?
                                                                        <img src={chatting.message} className="max-w-[min(300px,30%)] rounded-2xl cursor-pointer"
                                                                            onClick={() => {
                                                                                setModalImage(chatting.message);
                                                                            }}
                                                                        />
                                                                        : <div className="flex flex-row items-center pl-3 cursor-pointer bg-slate-100 rounded-2xl"
                                                                            onClick={() => {

                                                                                fetch(chatting.message.url, {
                                                                                    method: 'GET',
                                                                                }).then(response => {

                                                                                    response.blob().then(blob => {
                                                                                        const url = window.URL.createObjectURL(blob);
                                                                                        const a = document.createElement('a');
                                                                                        a.href = url;
                                                                                        a.download = chatting.message.name
                                                                                        a.click();
                                                                                    });

                                                                                });


                                                                            }
                                                                            }
                                                                        >
                                                                            <PaperClipIcon className="w-4 h-4 text-gray-600" />
                                                                            <div className="py-2 pl-2 pr-4 text-gray-800 rounded-2xl">
                                                                                {
                                                                                    chatting.message.name
                                                                                }
                                                                            </div>
                                                                        </div>

                                                            }
                                                            {/* End Card */}

                                                        </div>
                                                    </div>


                                                );
                                            } else if (chatting.sender === 'you') {

                                                const isPrevChattingYou = chattingList[index - 1] && chattingList[index - 1].sender === 'you';
                                                return (

                                                    <div className="flex flex-col mb-1" key={
                                                        chatting.created_at

                                                    }>
                                                        <div className="flex flex-row gap-2 group">
                                                            {
                                                                !isPrevChattingYou ? <img
                                                                    className="inline-block rounded-full w-9 h-9"
                                                                    src={selectedChattingRoom.targetProfileImage ? selectedChattingRoom.targetProfileImage : "https://st3.depositphotos.com/9998432/13335/v/450/depositphotos_133351928-stock-illustration-default-placeholder-man-and-woman.jpg"
                                                                    } />
                                                                    : <div className="ml-1 w-9 h-9"></div>
                                                            }


                                                            <div className="flex flex-row items-end w-full hs-tooltip  [--placement:top]">
                                                                {/* Card */}
                                                                {
                                                                    chatting.type == "text" ?
                                                                        <div className="max-w-[75%] px-3 py-2 text-gray-800 border-gray-200 border shadow-sm  rounded-2xl break-all whitespace-pre-wrap">
                                                                            {chatting.message}
                                                                        </div> : chatting.type == "image" ?
                                                                            <img src={chatting.message} className="max-w-[min(300px,30%)] rounded-2xl cursor-pointer "
                                                                                onClick={() => {
                                                                                    setModalImage(chatting.message);
                                                                                }}
                                                                            />
                                                                            : <div className="flex flex-row items-center pl-3 cursor-pointer bg-slate-100 rounded-2xl"
                                                                                onClick={() => {

                                                                                    fetch(chatting.message.url, {
                                                                                        method: 'GET',
                                                                                    }).then(response => {

                                                                                        response.blob().then(blob => {
                                                                                            const url = window.URL.createObjectURL(blob);
                                                                                            const a = document.createElement('a');
                                                                                            a.href = url;
                                                                                            a.download = chatting.message.name
                                                                                            a.click();
                                                                                        });

                                                                                    });


                                                                                }
                                                                                }
                                                                            >
                                                                                <PaperClipIcon className="w-4 h-4 text-gray-600" />
                                                                                <div className="py-2 pl-2 pr-4 text-gray-800 rounded-2xl">
                                                                                    {
                                                                                        chatting.message.name
                                                                                    }
                                                                                </div>
                                                                            </div>

                                                                }
                                                                {/* End Card */}
                                                                <span className="z-10 inline-block px-2 py-1 text-xs font-medium text-gray-600 opacity-0 group-hover:opacity-100 ">

                                                                    {
                                                                        (() => {
                                                                            let date = new Date(chatting.created_at);
                                                                            return date.toLocaleString('ko-KR', { hour: '2-digit', minute: '2-digit', 'day': '2-digit', 'month': '2-digit', 'year': 'numeric' })
                                                                        })()
                                                                    }
                                                                </span>
                                                            </div>
                                                        </div>

                                                    </div>



                                                );
                                            }



                                        })
                                    }
                                </div>
                                <div className="flex flex-shrink-0">
                                    <div className="flex flex-col w-full">
                                        <div className="flex flex-row w-full gap-3 px-5 py-3">
                                            <div className="flex-grow">

                                                <div className="relative flex-row w-full">
                                                    <textarea
                                                        id="chattingInput"
                                                        className="w-full h-10 py-2 pl-3 pr-[3rem] border-2 border-gray-300 rounded-full focus:ring-primary focus:border-primary focus:ring-1
                                                        overflow-hidden focus:outline-none resize-none
                                                        "
                                                        placeholder="메시지를 입력하세요"
                                                        ref={chattingInputRef}

                                                        onKeyDown={(e) => {
                                                            if (e.key === 'Enter') {
                                                                if (e.shiftKey) {
                                                                    return;
                                                                }
                                                                e.preventDefault();
                                                                submitChatting();
                                                            }
                                                        }}
                                                    />
                                                    <div className="flex flex-row">
                                                        <PhotoIcon className="absolute top-[45%] translate-y-[-50%] right-[3rem] w-5 h-5 text-gray-600 cursor-pointer" onClick={() => {
                                                            console.log('upload image');
                                                            chattingImageUploaderRef.current?.click();
                                                        }} />
                                                        <input
                                                            id="chattingImageUploader"
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            ref={chattingImageUploaderRef}

                                                            accept="image/*"
                                                            onChange={async (e) => {
                                                                if (e.target.files && e.target.files.length > 0) {
                                                                    sendFile(e.target.files[0], "image");
                                                                }

                                                            }}
                                                        />
                                                        <PaperClipIcon className="absolute top-[45%] translate-y-[-50%] right-5 w-5 h-5 text-gray-600 cursor-pointer" onClick={() => {
                                                            console.log('upload file');
                                                            chattingFileUploaderRef.current?.click();
                                                        }} />
                                                        <input
                                                            id="chattingFileUploader"
                                                            type="file"
                                                            style={{ display: 'none' }}
                                                            ref={chattingFileUploaderRef}


                                                            onChange={async (e) => {

                                                                if (e.target.files && e.target.files.length > 0) {
                                                                    let maxSize = 100 * 1024 * 1024; //* 100MB 사이즈 제한
                                                                    let fileSize = e.target.files[0].size; //업로드한 파일용량
                                                                    if (fileSize > maxSize) {
                                                                        alert("파일 사이즈가 100MB를 초과했습니다.");
                                                                        return;
                                                                    }

                                                                    sendFile(e.target.files[0], "file");
                                                                }

                                                            }}
                                                        />
                                                    </div>

                                                </div>
                                            </div>
                                            <div className="flex-shrink">
                                                <div className="p-2 rounded-full cursor-pointer bg-primary">
                                                    <PaperAirplaneIcon
                                                        className="w-5 h-5 text-white"
                                                        onClick={() => {
                                                            submitChatting();
                                                        }}
                                                    />
                                                </div>
                                            </div>
                                        </div>

                                    </div>
                                </div>

                            </div> : (<div className="flex flex-col items-center justify-center w-full h-full">
                                <div>
                                    채팅을 시작해보세요!
                                </div>
                            </div>)
                        }
                    </div>
                </div>
            </div>
            <div className="absolute float-left w-full h-[200px] bg-gray-300 z-[-10]">

            </div>


        </main>
    );
}

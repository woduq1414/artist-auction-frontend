'use client'
import { useGoods } from "@/app/_store/useGoods";
import Config from "@/config/config.export";
import { useRouter, useSearchParams } from "next/navigation";
import { useState, useEffect } from "react";
import { Cookies } from "react-cookie";


export default function SuccessPage() {

    const searchParams = useSearchParams();
    const [responseData, setResponseData] = useState(null);
    const { title, mainImage, artist, getGoods } = useGoods();
    useEffect(() => {

        if(!searchParams.get("orderId") || !searchParams.get("amount") || !searchParams.get("paymentKey") || !searchParams.get("paymentType")){
            return;
        }
        if(searchParams.get("artistGoodsId")){
            getGoods(searchParams.get("artistGoodsId") as string, false);
        }
     
        const requestData = {
            orderId: searchParams.get("orderId"),
            amount: searchParams.get("amount"),
            paymentKey: searchParams.get("paymentKey"),
            paymentType: searchParams.get("paymentType")
        };

        // TODO: 개발자센터에 로그인해서 내 결제위젯 연동 키 > 시크릿 키를 입력하세요. 시크릿 키는 외부에 공개되면 안돼요.
        // @docs https://docs.tosspayments.com/reference/using-api/api-keys

        // 토스페이먼츠 API는 시크릿 키를 사용자 ID로 사용하고, 비밀번호는 사용하지 않습니다.
        // 비밀번호가 없다는 것을 알리기 위해 시크릿 키 뒤에 콜론을 추가합니다.
        // @docs https://docs.tosspayments.com/reference/using-api/authorization#%EC%9D%B8%EC%A6%9D


        async function confirm() {
            if (!requestData.orderId || !requestData.amount || !requestData.paymentKey || !requestData.paymentType) {
                return;
            }
            let res = await fetch(Config().baseUrl + '/payment/confirm/', {
                method: 'POST',
                headers: {
                    "Authorization": "Bearer " + new Cookies().get('accessToken'),
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    amount: parseInt(requestData.amount),
                    order_id: requestData.orderId,
                    payment_key: requestData.paymentKey,
                    payment_type: requestData.paymentType
                })
            })
            // if (!res.ok) {
            //     throw new Error('결제 확인에 실패했습니다.');
            // }
            return res.json();

        }
        confirm().then((data) => {
            setResponseData(data);
        });
    }, [searchParams]);

    const router = useRouter();

    return (
        <>
            {
                responseData && title ? (
                    <div className="w-full max-w-2xl absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md rounded-xl px-6 py-6 bg-slate-50 text-center
                    flex flex-col gap-3 items-left
                    ">
                        <div className="mb-4 text-2xl font-semibold text-center">결제 성공</div>
                        <div className='flex flex-row w-full max-w-2xl px-2 py-3 text-xl font-semibold text-center bg-slate-100'>

                            <div className='flex-shrink-0'>
                                <img src={mainImage.url} alt="logo" className="h-[100px]" />
                            </div>
                            <div className='flex flex-col items-start justify-center flex-grow pl-3 gap'>
                                <div className='text-2xl font-semibold'>
                                    {title}
                                </div>
                                <div className='text-sm text-gray-500'>
                                    {artist.nickname}
                                </div>
                            </div>
                        </div>
                        <button className="p-2 mt-3 text-white rounded-lg text-md bg-primary" onClick={() => {
                            router.push(
                                "/my"
                            )
                        }}>마이 페이지로</button>
                    </div>
                ) : (
                    <div className="w-[500px] absolute top-[50%] left-[50%] translate-x-[-50%] translate-y-[-50%] shadow-md rounded-xl px-3 py-20 bg-slate-50 text-xl text-center
        flex flex-col gap-3 items-center
        ">
                        <div>결제 진행 중</div>
                        <div className="animate-spin inline-block w-8 h-8 border-[3px] border-current border-t-transparent text-primary rounded-full dark:text-blue-500" role="status" aria-label="loading">
                            <span className="sr-only">Loading...</span>
                        </div>
                    </div>
                )
            }

        </>
    );
}
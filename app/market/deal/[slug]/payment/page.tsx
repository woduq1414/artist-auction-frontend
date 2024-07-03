'use client'

import { useGoods } from "@/app/_store/useGoods";
import { FastAverageColor } from "fast-average-color";
import { useEffect, useRef, useState } from "react";
import Chart from "react-apexcharts";
import { debounce, set, throttle } from 'lodash';
//Or 
import dynamic from 'next/dynamic'



import { ArrowRightIcon } from "@heroicons/react/24/solid";
import { useSwipeable } from "react-swipeable";
import Skeleton from "react-loading-skeleton";
import { useRouter } from "next/navigation";
import { Mark } from "@tiptap/pm/model";
import MarketFormPage from "@/app/_components/MarketFormPage";
import Config from "@/config/config.export";
import { Cookies } from "react-cookie";
import NewDealPage from "@/app/market/[slug]/deal/new/page";

import { PaymentWidgetInstance, loadPaymentWidget, ANONYMOUS } from "@tosspayments/payment-widget-sdk";
import { useAuth } from "@/app/_store/useAuth";
import { useQuery } from "@tanstack/react-query";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
const selector = "#payment-widget";
const queryClient = new QueryClient();
// TODO: clientKey는 개발자센터의 결제위젯 연동 키 > 클라이언트 키로 바꾸세요.
// TODO: customerKey는 구매자와 1:1 관계로 무작위한 고유값을 생성하세요.
// @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
const clientKey = "test_gck_docs_Ovk5rk1EwkEbP0W43n07xlzm";

const ApexChart = dynamic(() => import("react-apexcharts"), { ssr: false });
function usePaymentWidget(clientKey: string, customerKey: string) {
    return useQuery({
        queryKey: ["payment-widget", clientKey, customerKey],
        queryFn: () => {
            // ------  결제위젯 초기화 ------
            // @docs https://docs.tosspayments.com/reference/widget-sdk#sdk-설치-및-초기화
            return loadPaymentWidget(clientKey, customerKey);
        },
    });
}


export default function Page({ params }: { params: { slug: string } }) {
    let slug = params.slug;
    const { userId } = useAuth();
    const customerKey = userId;
    const [deal, setDeal] = useState<any>(undefined);
    const { title, mainImage, artist, getGoods, id } = useGoods();

    const [paymentAmount, setPaymentAmount] = useState(0);

    async function getDeal() {
        const res = await fetch(Config().baseUrl + '/artist/goods/deal/' + params.slug + "?is_payment=true",
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
            window.location.href = "/market"
        }
        console.log(data.data)
        setDeal(data.data);
        // if (data.data.company.id != id) {
        //     window.location.href = "/market"
        // }


        await getGoods(data.data.artist_goods_id, false);
    }
    useEffect(() => {
        if (userId) {
            getDeal();


            loadPaymentWidget(clientKey, userId).then((widget) => {
                setPaymentWidget(widget);
            }
            );
        }

    }, [userId]);
    useEffect(() => {
        if (userId) {
            getDeal();
            loadPaymentWidget(clientKey, userId).then((widget) => {
                setPaymentWidget(widget);
            }
            );
        }
    }, []);

    // const { data: paymentWidget } = usePaymentWidget(clientKey, customerKey);

    const [paymentWidget, setPaymentWidget] = useState<PaymentWidgetInstance | null>(null);

    // const paymentWidget = usePaymentWidget(clientKey, ANONYMOUS); // 비회원 결제
    const paymentMethodsWidgetRef = useRef<ReturnType<PaymentWidgetInstance["renderPaymentMethods"]> | null>(null);
 
    const [paymentMethodsWidgetReady, isPaymentMethodsWidgetReady] = useState(false);

    useEffect(() => {

    }, []);

    useEffect(() => {
        if (!paymentWidget || !deal) {
            return;
        }
        console.log(deal.id + "+" + userId + new Date().getTime())

        // ------  결제 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/reference/widget-sdk#renderpaymentmethods선택자-결제-금액-옵션
        const paymentMethodsWidget = paymentWidget.renderPaymentMethods(selector, { value: deal.price * 1.1 }, { variantKey: "DEFAULT" });
        setPaymentAmount(deal.price * 11000);

        // ------  이용약관 UI 렌더링 ------
        // @docs https://docs.tosspayments.com/reference/widget-sdk#renderagreement선택자-옵션
        paymentWidget.renderAgreement("#agreement", { variantKey: "AGREEMENT" });

        //  ------  결제 UI 렌더링 완료 이벤트 ------
        paymentMethodsWidget.on("ready", () => {
            paymentMethodsWidgetRef.current = paymentMethodsWidget;
            isPaymentMethodsWidgetReady(true);
        });
    }, [paymentWidget]);

    useEffect(() => {
        const paymentMethodsWidget = paymentMethodsWidgetRef.current;

        if (paymentMethodsWidget == null) {
            return;
        }

        // ------ 금액 업데이트 ------
        // @docs https://docs.tosspayments.com/reference/widget-sdk#updateamount결제-금액
        paymentMethodsWidget.updateAmount(deal.price * 1.1);
    }, [deal]);

    return (

        <main className="w-[80%]  mx-auto   flex flex-col justify-center items-center">
            {/* {step} */}
            <div className='h-[80px] flex flex-col justify-center items-center  '>
                <img src="/images/logo.png" alt="logo" className="h-[35px]" />
            </div>
            <div className="w-[100%] rounded-xl  h-full">
                <div className='flex flex-col h-full mx-5 my-5'>
                    {/* Stepper */}
                    <div id="stepper" className='flex flex-row h-[calc(100vh-120px)] bg-slate-50 '>
                        {/* Stepper Nav */}

                        {/* End Stepper Nav */}
                        {/* Stepper Content */}



                        <div className="flex flex-col flex-grow mt-2 overflow-y-auto " >


                            {/* First Contnet */}

                            {/* End First Contnet */}
                            {/* First Contnet */}
                            <div

                            >
                                <div className=" max-w-[90%] mx-auto px-5 py-8 space-y-2 border-dashed rounded-xl flex flex-col gap-6
                            justify-center items-center
                            "


                                >

                                    {
                                        title === undefined ? <div className="w-full max-w-xl">
                                            <Skeleton

                                                height={115} />
                                        </div> : (
                                            <div className='flex flex-row w-full max-w-xl px-2 py-3 text-xl font-semibold text-center bg-slate-100'>

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
                                        )
                                    }

                                    {/* <div className={`flex flex-col  max-w-xl w-full gap-2
                                
                                    `}>
                                        <label
                                            htmlFor="inline-input-label-with-helper-text"
                                            className="block text-lg font-semibold "
                                        >
                                            프로젝트 제목
                                        </label>
                                        <input
                                            type="text"
                                            id="inline-input-label-with-helper-text"
                                            className="block w-full max-w-xl px-4 py-3 border border-gray-200 rounded-lg text-md focus:border-primary focus:ring-primary disabled:opacity-50 disabled:pointer-events-none "
                                            placeholder="프로젝트 제목을 입력해주세요."
                                            aria-describedby="hs-inline-input-helper-text"
                                            value={dealTitle}



                                        />

                                    </div> */}



                                    {
                                        deal &&
                                        <div className="flex flex-col items-center w-full">

                                            <div className='flex flex-col w-full max-w-xl gap-2 px-10 py-2 bg-white'>
                                                <div className='flex flex-row items-center justify-between text-md'>
                                                    <div>
                                                        거래 가격
                                                    </div>
                                                    <div>
                                                        <span className='text-xl font-bold'>{(deal.price * 1.0).toLocaleString()}</span> 원
                                                    </div>
                                                </div>
                                                <div className='flex flex-row items-center justify-between text-md'>
                                                    <div>
                                                        부가 가치세 (10%)
                                                    </div>
                                                    <div>
                                                        <span className='text-xl font-bold'>{(deal.price * 0.1).toLocaleString()}</span> 원
                                                    </div>
                                                </div>

                                                <div className='flex flex-row items-center justify-between pt-2 border-t-2 text-md'>
                                                    <div>
                                                        합계
                                                    </div>
                                                    <div>
                                                        <span className='text-2xl font-bold'>{(deal.price * 1.1).toLocaleString()}</span> 원
                                                    </div>
                                                </div>
                                            </div>


                                            <div className="w-full max-w-xl wrapper">
                                                <div className="box_section">
                                                    <div id="payment-widget" />
                                                    <div id="agreement" />


                                                    <button
                                                        className="w-full py-3 mt-4 text-white rounded-lg cursor-pointer button bg-primary"

                                                        disabled={!paymentMethodsWidgetReady}
                                                        onClick={async () => {
                                                            let orderId = deal.id + "_" + new Date().getTime();
                                                            // TODO: 결제를 요청하기 전에 orderId, amount를 서버에 저장하세요.
                                                            // 결제 과정에서 악의적으로 결제 금액이 바뀌는 것을 확인하는 용도입니다.
                                                            let res = await fetch(Config().baseUrl + '/payment/new', {
                                                                method: 'POST',
                                                                headers: {
                                                                    "Authorization": "Bearer " + new Cookies().get('accessToken'),
                                                                    "Content-Type": "application/json"
                                                                },
                                                                body: JSON.stringify({
                                                                    amount: paymentAmount,
                                                                    order_id: orderId
                                                        
                                                                })
                                                            })
                                                            if (res.status !== 200) {
                                                                alert("결제 요청에 실패했습니다.")
                                                                return;
                                                            }


                                                            try {
                                                                // ------ '결제하기' 버튼 누르면 결제창 띄우기 ------
                                                                // @docs https://docs.tosspayments.com/reference/widget-sdk#requestpayment결제-정보

                                                                await paymentWidget?.requestPayment({
                                                                    orderId: orderId,
                                                                    orderName: "토스 티셔츠 외 2건",
                                                                    customerName: "김토스",
                                                                    customerEmail: "customer123@gmail.com",
                                                                    customerMobilePhone: "01012341234",
                                                                    successUrl: `${window.location.origin}/payment/success?artistGoodsId=${id}`,
                                                                    failUrl: `${window.location.origin}/fail`,
                                                                });
                                                            } catch (error) {
                                                                // 에러 처리하기
                                                                console.error(error);
                                                            }
                                                        }}
                                                    >
                                                        결제하기
                                                    </button>
                                                </div>
                                            </div>
                                        </div>


                                    }


                                </div>
                            </div>

                            {/* End First Contnet */}

                            {/* Final Contnet */}

                            {/* End Final Contnet */}
                            {/* Button Group */}

                            {/* End Button Group */}

                        </div>

                        {/* End Stepper Content */}
                    </div>
                    {/* End Stepper */}
                </div>

            </div>

        </main>

    )




}
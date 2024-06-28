import React, { useEffect } from 'react';
import ReactModal from 'react-modal';
import { useImageModal } from '../_store/useImageModal';
import { TransformWrapper, TransformComponent } from "react-zoom-pan-pinch";

const customModalStyles: ReactModal.Styles = {
    overlay: {
        backgroundColor: "rgba(0, 0, 0, 0.4)",
        width: "100%",
        height: "100vh",
        zIndex: 1000000000,
        position: "fixed",
        top: 0,
        left: 0,
    },
    content: {

        // height: "80vh",
 
        maxWidth: "80vw",
        maxHeight: "80vh",
        zIndex: 2000000000,
        position: "absolute",
        top: "50%",
        left: "50%",
        right : "auto",
        bottom : "auto",
        transform: "translate(-50%, -50%)",
        padding: 0,
        
        // borderRadius: "10px",
        border: "none",
        // boxShadow: "2px 2px 2px rgba(0, 0, 0, 0.25)",
        backgroundColor: 'transparent',
        justifyContent: "center",
        overflow: "hidden",

    },
};


interface ModalProps {
    //   children: React.ReactNode;
    onRequestClose: () => void;
}

const ImageZoomModal: React.FC<ModalProps> = ({ onRequestClose = undefined }) => {
    const modalImageRef = React.createRef<HTMLImageElement>();
    const { modalImage, setModalImage} = useImageModal();

    const [modalImageWidth, setModalImageWidth] = React.useState(0);
    const [modalImageHeight, setModalImageHeight] = React.useState(0);

    
    // 모달을 닫을 때 onRequestClose 함수 호출
    const closeModal = () => {
        if (onRequestClose) {
            onRequestClose();

        }
        setModalImage('');

    };

    useEffect(() => {
        // get width and height of image
        const img = new Image();
        img.src = modalImage;

        img.onload = () => {
            const imgWidth = img.width;
            const imgHeight = img.height;

            const windowWidth = window.innerWidth;
            const windowHeight = window.innerHeight;

            const widthRatio = windowWidth / imgWidth;
            const heightRatio = windowHeight / imgHeight;

            const ratio = Math.min(widthRatio, heightRatio) * 0.8

            setModalImageWidth(imgWidth * ratio);
            setModalImageHeight(imgHeight * ratio);

            console.log(imgWidth, imgHeight);
            console.log(imgWidth * ratio, imgHeight * ratio);
        };

    }, [modalImage]);

    return (
        <ReactModal
            isOpen={modalImage !== ''}
            style={customModalStyles} // 스타일 적용
            onRequestClose={closeModal} // 모달 창 닫기 요청을 받을 때 호출
            shouldCloseOnOverlayClick={true} // 외부 클릭으로 모달 닫기 활성화
        >
            <div className="modal-content">
                <TransformWrapper initialScale={1}
                
                    initialPositionX={0}
                    initialPositionY={0}
                    centerZoomedOut={false}
                    wheel={{ }}
          
                >
                    <TransformComponent contentStyle={{
                            width: modalImageWidth,
                            height: modalImageHeight,
                  
                        }}>
                        {/* {children} */}
                        <img 
                        ref={modalImageRef}
                        src={modalImage} alt="zoom" className="" 
                       
                        />
                    </TransformComponent>
                </TransformWrapper>
                {/* <button onClick={closeModal}>닫기</button> */}
            </div>
        </ReactModal>
    );
};

export default ImageZoomModal;
import { Html5QrcodeScanner } from "html5-qrcode";
import { useEffect, useState } from "react";
import { FC } from 'react';

const Html5QrcodePlugin : FC<any> = (props) => {
    const [scanner, setScanner] = useState<any>(null);

    const createConfig = (props:any) => {
        let config : any = {};
        if (props.fps) {
        config.fps = props.fps;
        }
        if (props.qrbox) {
        config.qrbox = props.qrbox;
        }
        if (props.aspectRatio) {
        config.aspectRatio = props.aspectRatio;
        }
        if (props.disableFlip !== undefined) {
        config.disableFlip = props.disableFlip;
        }
        return config;
    }

    useEffect(() => {
        console.log("Html5QrcodeScanner useEffect")
        if (props.isOpen && !scanner) {
            let config = createConfig(props);
            let verbose = props.verbose === true;
    
            // Suceess callback is required.
            if (!(props.qrCodeSuccessCallback )) {
                throw "qrCodeSuccessCallback is required callback.";
            }
    
            const html5QrcodeScanner = new Html5QrcodeScanner(
                props.qrcodeRegionId, config, verbose);
    
            console.log("Starting Html5QrcodeScanner")
            html5QrcodeScanner.render(
                props.qrCodeSuccessCallback,
                props.qrCodeErrorCallback);
            setScanner(html5QrcodeScanner);
        } else if(scanner && !props.isOpen) {
            console.log("Unmounting Html5QrcodeScanner")
            scanner.clear().catch((error: any) => {
                console.error("Failed to clear html5QrcodeScanner. ", error);
            });
            setScanner(null);
        }
    }, [props.isOpen])

    return (
        <div id={props.qrcodeRegionId} />
    )
}

export default Html5QrcodePlugin;
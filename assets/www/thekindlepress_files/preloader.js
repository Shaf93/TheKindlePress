(function(){

    if (MobileUtils.isMobile() && MobileUtils.isViewportOpen()) {
        var viewport = document.getElementById('wixMobileViewport');
        var scale = MobileUtils.getInitZoom();
        viewport.setAttribute('content','maximum-scale = '+ scale +', minimum-scale = '+ scale);

        var WinMobileZoomFix = rendererModel.runningExperiments.WinMobileZoomFix || rendererModel.runningExperiments.winmobilezoomfix;
        var WinMobileZoomFixEnabled = WinMobileZoomFix && (WinMobileZoomFix === "New" || WinMobileZoomFix === "new");

        if(WinMobileZoomFix && MobileUtils.isMSMobileDevice()){
            document.body.style.msTouchAction = 'pan-y';
        }

        if(MobileUtils.isMSMobileDevice()){
            document.querySelector("#viewer_preloader").className+=' ms-device-preloader';
            document.querySelector("#preloader").className+=' ms-device-preloader';
            if(document.querySelector("#userLogo")){
                document.querySelector("#userLogo").className+=' ms-device-preloader';
            }
        }

        if (MobileUtils.earlyIsExperimentOpen && MobileUtils.earlyIsExperimentOpen('InitFromStatic') &&
            MobileUtils.earlyIsExperimentOpen('PageManagerRefactor2')) {

            var isMobileOptimizedOn = window.publicModel.adaptiveMobileOn;
            var isEnablePreloader = window.rendererModel.siteMetaData && window.rendererModel.siteMetaData.preloader &&
                window.rendererModel.siteMetaData.preloader.enabled;
            //isEnablePreloader is undefined if ActivateInitFromStatic was open during publish in the editor
            //so this part actually replaces the ActivateInitFromStatic experiment in the viewer
            if (!isMobileOptimizedOn || (isMobileOptimizedOn && (isEnablePreloader === true || isEnablePreloader === undefined))){
                document.getElementById("viewer_preloader").style.display = "block";
            }

        } else {
            document.getElementById("viewer_preloader").style.display = "block";
        }
    }
})();
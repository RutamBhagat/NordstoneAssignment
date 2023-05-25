import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHR from "@uppy/xhr-upload";

let uppy = null;
if (typeof window !== "undefined") {
  uppy = new Uppy().use(Webcam).use(XHR, { endpoint: "https://api.cloudinary.com/v1_1/drxe0t2yg/image/upload" });
}

export default uppy;

import Uppy from "@uppy/core";
import Webcam from "@uppy/webcam";
import XHR from "@uppy/xhr-upload";

let uppy = null;
if (typeof window !== "undefined") {
  uppy = new Uppy().use(Webcam).use(XHR, {
    endpoint: "http://localhost:5000/upload",
    fieldName: "photo",
    formData: true,
  });
}

export default uppy;

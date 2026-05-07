import { createContext } from "preact";

export const SelectedFileContext = createContext({
    selectedFile: null,
    setSelectedFile: () => {},
    clearUploadPreview: () => {}
});
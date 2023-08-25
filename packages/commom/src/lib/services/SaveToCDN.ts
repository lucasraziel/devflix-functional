import { AsyncReturn, FileInfo, FileSaved } from "../types";

export type SaveToCDN = (file: FileInfo) => AsyncReturn<FileSaved>;

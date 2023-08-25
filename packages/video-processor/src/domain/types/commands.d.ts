import { Command, FileInfo } from "@fvsystem/commom";
import { UnprocessedVideo } from "./basic";

export type UploadInfoCommand = Command<UploadInfo, FileInfo>;


export type ProcessFileCommand = Command<ProcessFile, UnprocessedVideo>;

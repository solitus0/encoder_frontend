export type Order = "asc" | "desc";

export interface Media {
  uuid: string;
  file_path: string;
  file_name: string;
  dimensions: string;
  file_size: number;
  video_codec: string[];
  audio_codec: string[];
  subtitle_codec: string[];
  updated_at: string;
}

export interface PaginatedMedia {
  items: Media[];
  currentPage: number;
  itemsPerPage: number;
  totalItems: number;
}

export interface Setting {
  key: string;
  value: string;
}

export interface HeadCell {
  disablePadding: boolean;
  key: keyof Media;
  label: string;
  isNumeric: boolean;
}

export interface EnhancedTableProps {
  numSelected: number;
  onRequestSort: (
    event: React.MouseEvent<unknown>,
    property: keyof Media
  ) => void;
  onSelectAllClick: (event: React.ChangeEvent<HTMLInputElement>) => void;
  order: Order;
  orderBy: string;
  rowCount: number;
}

export interface EnhancedTableToolbarProps {
  numSelected: number;
}

export type ColumnOrder = {
  id: keyof Media;
  primary: string;
};

export const mediaSample: Media = {
  uuid: "",
  file_path: "",
  file_name: "",
  dimensions: "",
  file_size: 0,
  video_codec: [],
  audio_codec: [],
  subtitle_codec: [],
  updated_at: "",
};

export const tableSize = {
  uuid: 200,
  file_path: 500,
  file_name: 500,
  dimensions: 200,
  file_size: 200,
  video_codec: 200,
  audio_codec: 200,
  subtitle_codec: 200,
  updated_at: 200,
};

export interface Preset {
  PresetName: string;
  AudioBitrate: string;
  AudioEncoder: string;
  AudioMixdown: string;
  AudioSamplerate: string;
  FileFormat: string;
  PictureWidth: number;
  PictureHeight: number;
  VideoEncoder: string;
  VideoPreset: string;
  VideoQualitySlider: number;
}

export interface Encode {
  status: string;
  media_uuid: string;
  source_path: string;
  source_size: number;
  created_at: string;
  output_size: number;
  command: string;
  output_path: string;
  duration_in_seconds: number;
}

export interface Permissions {
  scan: boolean;
  scan_path: boolean;
  temp_path: boolean;
}

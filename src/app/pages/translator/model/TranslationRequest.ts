export interface TranslationRequest {
  text: string;
  source_lang?: string; // 可选，默认值由后端或调用方处理
  target_lang?: string; // 可选，默认值由后端或调用方处理
}

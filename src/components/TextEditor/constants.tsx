import type { TTextEditorTextStyle } from "./types";
import {
  BoldOutlined,
  HighlightOutlined, ItalicOutlined,
  OrderedListOutlined,
  UnderlineOutlined,
  UnorderedListOutlined
} from "@ant-design/icons";

export const TEXT_EDITOR_STYLE_TO_HTML = (style: TTextEditorTextStyle) => {
  switch (style) {
    case "H1":
        // eslint-disable-next-line
      return <h1 />;
    case "H2":
      // eslint-disable-next-line
      return <h2 />;
    case "OL":
      return <ol />;
    case "UL":
      return <ul />;
    case "BOLD":
      return <strong />;
    case "UNDERLINE":
      return <u />;
    case "HIGHLIGHT":
      return <span className="highlight" />;
    default:
      return null;
  }
};

export const TEXT_EDITOR_CUSTOM_STYLES = {
  HIGHLIGHT: {
    backgroundColor: "#ff0000",
    color: "#fff",
  },
};

export const TEXT_EDITOR_BLOCK_TYPES = [
  { label: "H1", style: "header-one", icon: "Заголовок", size: "extra-small" },
  { label: "H2", style: "header-two", icon: "Подзаголовок", size: "extra-small" },
  { label: "OL", style: "ordered-list-item", icon: <OrderedListOutlined />, size: "medium" },
  { label: "UL", style: "unordered-list-item", icon: <UnorderedListOutlined />, size: "medium" },
];

export const TEXT_EDITOR_INLINE_STYLES = [
  { label: "Bold", style: "BOLD", icon: <BoldOutlined />, size: "extra-small" },
  { label: "Underline", style: "UNDERLINE", icon: <UnderlineOutlined />, size: "small" },
  { label: "Highlight", style: "HIGHLIGHT", icon: <HighlightOutlined />, size: "small" },
  { label: "Italic", style: "ITALIC", icon: <ItalicOutlined />, size: "small" },
];

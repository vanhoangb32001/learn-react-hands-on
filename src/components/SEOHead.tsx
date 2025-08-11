import { useEffect } from "react";

type SEOHeadProps = {
  title: string;
  description?: string;
  canonicalPath?: string;
};

const ensureMeta = (name: string) => {
  let el = document.querySelector(`meta[name="${name}"]`) as HTMLMetaElement | null;
  if (!el) {
    el = document.createElement("meta");
    el.setAttribute("name", name);
    document.head.appendChild(el);
  }
  return el;
};

const ensureLinkRel = (rel: string) => {
  let el = document.querySelector(`link[rel="${rel}"]`) as HTMLLinkElement | null;
  if (!el) {
    el = document.createElement("link");
    el.setAttribute("rel", rel);
    document.head.appendChild(el);
  }
  return el;
};

export const SEOHead = ({ title, description = "Bộ bài tập React UI – không dùng API, dữ liệu mock.", canonicalPath }: SEOHeadProps) => {
  useEffect(() => {
    document.title = title;

    const desc = ensureMeta("description");
    desc.setAttribute("content", description);

    const canonical = ensureLinkRel("canonical");
    const url = new URL(canonicalPath || window.location.pathname, window.location.origin);
    canonical.setAttribute("href", url.toString());

    // Basic Open Graph via existing tags (fallback handled by index.html)
    const ogTitle = document.querySelector('meta[property="og:title"]') as HTMLMetaElement | null;
    ogTitle?.setAttribute("content", title);
    const ogDesc = document.querySelector('meta[property="og:description"]') as HTMLMetaElement | null;
    ogDesc?.setAttribute("content", description);
  }, [title, description, canonicalPath]);

  return null;
};

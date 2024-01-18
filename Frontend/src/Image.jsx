export default function Image({ src, ...rest }) {
  src =
    src && src.includes("https://")
      ? src
      : "https://placebooking-com.onrender.com" + src;
  return <img {...rest} src={src} alt={""} />;
}

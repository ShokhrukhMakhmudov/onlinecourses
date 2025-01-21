export default function Loading() {
  return (
    <div className="w-full h-full flex items-center justify-center">
      <span
        className="loading loading-spinner loading-lg"
        style={{
          zoom: 2,
        }}></span>
    </div>
  );
}

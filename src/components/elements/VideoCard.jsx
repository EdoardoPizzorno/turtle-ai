export default function VideoCard({ title, videoUrl }) {
    return (
        <div className="bg-black rounded-2xl p-4 shadow-lg">
            <h2 className="text-lg font-semibold mb-2">{title}</h2>
            <div className="aspect-video rounded-lg overflow-hidden">
                <iframe
                    width="100%"
                    height="100%"
                    src={videoUrl}
                    allowFullScreen
                    className="rounded-lg"
                />
            </div>
        </div>
    );
}  
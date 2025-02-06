export default function remarkEmbedYouTube() {
    return (tree) => {
        const visit = (node, parent) => {
            if (
                node.type === "paragraph" &&
                node.children.length === 1 &&
                node.children[0].type === "link"
            ) {
                const url = node.children[0]?.url;
                if (!url) return; // ✅ Prevents undefined issues

                const youtubeMatch = url.match(
                    /(?:https?:\/\/)?(?:www\.)?(?:youtube\.com\/watch\?v=|youtu\.be\/)([\w-]+)/
                );

                if (youtubeMatch) {
                    const videoId = youtubeMatch[1];
                    if (!videoId) return; // ✅ Ensures a valid video ID is extracted

                    if (!parent || !parent.children) return; // ✅ Ensures parent.children exists

                    parent.children = parent.children.map((child) =>
                        child === node
                            ? {
                                type: "html",
                                value: `<iframe class="w-full aspect-video rounded-lg shadow-lg" src="https://www.youtube.com/embed/${videoId}" allowfullscreen></iframe>`,
                            }
                            : child
                    );
                }
            }
        };

        function traverse(node, parent = null) {
            if (Array.isArray(node.children)) {
                node.children.forEach((child) => traverse(child, node));
            }
            visit(node, parent);
        }

        traverse(tree);
    };
}

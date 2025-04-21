import './header.css'

const Wave = (props) => (
    <div className="w-full overflow-hidden">
        <svg viewBox="0 0 100 3.6" {...props} id="wave-svg" style={{ width: '100%', height: 'auto' }}>
            <defs>
                <linearGradient id="gradient">
                    <stop stopColor="#5622E2" />
                </linearGradient>
                <pattern
                    id="wave"
                    x={0}
                    y={-0.5}
                    width="100%"
                    height="100%"
                    patternUnits="userSpaceOnUse"
                >
                    <path
                        id="wavePath"
                        d="m -45 2 q 10 2 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 t 20 0 v -2 h -160 z"
                        mask="url(#mask)"
                        fill="url(#gradient)"
                    >
                        <animateTransform
                            attributeName="transform"
                            begin="0s"
                            dur="3.5s"
                            type="translate"
                            from="0,0"
                            to="40,0"
                            repeatCount="indefinite"
                        />
                    </path>
                </pattern>
            </defs>
            <rect
                x={0}
                y={0}
                width={"100%"}
                height={3}
                fill="url(#wave)"
                fillOpacity={1}
            />
        </svg>
    </div>
);

export default Wave;

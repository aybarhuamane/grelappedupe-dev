import React, { useState, CSSProperties } from 'react';

export default function DownloadButton() {
    const [hovered, setHovered] = useState(false);

    const buttonStyle: CSSProperties = {
        position: 'relative',
        width: '150px',
        height: '40px',
        cursor: 'pointer',
        display: 'flex',
        alignItems: 'center',
        border: '1px solid #17795E',
        backgroundColor: hovered ? '#17795E' : '#209978',
        overflow: 'hidden',
        transition: 'all 0.3s',
    };

    const textStyle: CSSProperties = {
        transform: 'translateX(22px)',
        color: hovered ? 'transparent' : '#fff',
        fontWeight: 600,
        transition: 'all 0.3s',
    };

    const iconStyle: CSSProperties = {
        position: 'absolute',
        transform: hovered ? 'translateX(0)' : 'translateX(109px)',
        height: '100%',
        width: hovered ? '148px' : '39px',
        backgroundColor: '#17795E',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        transition: 'all 0.3s',
    };

    const svgStyle: CSSProperties = {
        width: '20px',
        fill: '#fff',
    };

    return (
        <div className="flex flex-row justify-center items-center">
            <button
                style={buttonStyle}
                type="button"
                onMouseEnter={() => setHovered(true)}
                onMouseLeave={() => setHovered(false)}
            >
                <span style={textStyle}>Download</span>
                <span style={iconStyle}>
                    <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 35 35" style={svgStyle}>
                        <path d="M17.5,22.131a1.249,1.249,0,0,1-1.25-1.25V2.187a1.25,1.25,0,0,1,2.5,0V20.881A1.25,1.25,0,0,1,17.5,22.131Z"></path>
                        <path d="M17.5,22.693a3.189,3.189,0,0,1-2.262-.936L8.487,15.006a1.249,1.249,0,0,1,1.767-1.767l6.751,6.751a.7.7,0,0,0,.99,0l6.751-6.751a1.25,1.25,0,0,1,1.768,1.767l-6.752,6.751A3.191,3.191,0,0,1,17.5,22.693Z"></path>
                        <path d="M31.436,34.063H3.564A3.318,3.318,0,0,1,.25,30.749V22.011a1.25,1.25,0,0,1,2.5,0v8.738a.815.815,0,0,0,.814.814H31.436a.815.815,0,0,0,.814-.814V22.011a1.25,1.25,0,1,1,2.5,0v8.738A3.318,3.318,0,0,1,31.436,34.063Z"></path>
                    </svg>
                </span>
            </button>
        </div>
    );
}

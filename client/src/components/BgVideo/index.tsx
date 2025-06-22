import Auth from '../../utils/auth';
// import { type MouseEvent} from 'react';

function Video() {
    let username = "";

        if (Auth.loggedIn()) {
            const user = Auth.getUser();
            console.log("User object:", user);
            username = user?.data?.name ||  "customer";
        }

    return (
        <div className="video-body video-section">
            <video src="/bgDark-white.mp4" loop autoPlay muted></video>
            <div className="video-copy">
                <h1>{Auth.loggedIn() ? username : "IVELIS BECKER"}</h1>
            </div>
        </div>
    )
};

export default Video;
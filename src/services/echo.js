import Echo from "laravel-echo";
import Pusher from "pusher-js";

const echoClient = new Echo({
    broadcaster: "pusher",
    key: "db4a1f17fa6b0796fe4f",
    cluster: "ap1",
    encrypted: true
});

export default echoClient;

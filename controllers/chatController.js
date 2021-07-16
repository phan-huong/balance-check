// module.exports = io => {
//     io.on("connection", client => {
//         console.log("new connection");
    
//         client.on("disconnect", () => {
//             console.log("user disconnected");
//         });
    
//         client.on("connect", () => {
//             console.log("user connected");
//         });
    
//         client.on("message", () => {
//             io.emit("message", { content: "Hello" });
//         });
//     });
// };
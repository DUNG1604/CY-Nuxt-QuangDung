    export default defineEventHandler((event) => {
        //check what the page is
        const req = event.node.req ?? {};
        const res = event.node.res ?? {};
        if(req.url?.includes("/test")) {
            console.log("log test server");
            res.writeHead(301, {Location: "/not-login"});
            res.end();
        }
    })
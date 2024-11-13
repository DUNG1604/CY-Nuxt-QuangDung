import { parseCookies } from 'h3';
import { sendRedirect } from 'h3';

export default defineEventHandler(async (event) => {
    // const cookies = parseCookies(event);
    // const token = cookies.token;
    // const exceptionPage = ['/login', '/signup', '/'];
    // const url = event.node.req.url || '';
    //
    // if (!token && !exceptionPage.includes(url)) {
    //     return sendRedirect(event, '/login');
    // }
});

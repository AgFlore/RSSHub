const got = require('@/utils/got');
const config = require('@/config').value;

module.exports = async (ctx) => {
    const sitename = ctx.params.site;
    let token;
    if (sitename === 'pku') {
        token = config.treehole.pkutoken;
    }

    const response = await got({
        method: 'get',
        url: `https://pkuhelper.pku.edu.cn/services/pkuhole/api.php?action=getlist&p=1&PKUHelperAPI=3.0&user_token=${token}`,
        headers: {
            Referer: `https://pkuhelper.pku.edu.cn/hole/`,
        },
    });
    const data = response.data.data;

    ctx.state.data = {
        title: `P大树洞`,
        link: `https://pkuhelper.pku.edu.cn/hole/`,
        description: `P大树洞`,
        item: data.map((item) => ({
            title: item.pid,
            description: `${item.text}`,
            pubDate: new Date(item.timestamp * 1000).toUTCString(),
            link: `https://pkuhelper.pku.edu.cn/hole/##${item.pid}`,
        })),
    };
};

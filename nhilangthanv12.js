const fs = require('fs');
const axios = require('axios');
const { Client } = require('discord.js-selfbot-v13');
const lunarDateText = getLunarTodayString();

const TOKEN = '';
const ADMIN_IDS = ['1356197093399597167', '1355923764172292127']; 
const client = new Client();
let spamming = false;
let spamChannel = null;
let spamContent = '';
let spamIndex = 0;
let notifiedUsers = new Set(); 

const spamMessages = [    
    "t có thể ửa m tới chết 🤣🤪{name}",
    "ahahaa cay bố rõ kìa =))) {name}",
    "ẳng liên tục k e ((((((= {name}",
    "câm = con mẹ m die 🤪🤪 {name}",
    "nhanh đi e :)) 🧐🤌{name}",
    "m run ak 🤣🤣 {name}",
    "yeu duoi qua e 😆 {name}",
    "chạy ank rõ kìa (((((= 🌶🌶  {name}",
    "sồn như culi đi con đĩ =))) 🤨🤨 {name}",
    "lồn ngu si bị bố sỉ nhục vào cái gia phả nghèo nàn của nó:)))🤣🤣 {name}",
    "trình ko có bày đặt ba hoa chích chòe là anh đè cn mẹ m ra anh địt đấy🤪🤪 {name}",
    "bố m độc nhất vô nhị chứ có phèn như ai kia đâu =)) {name}",
    "gõ mỏ tụng tao kinh cầm cây đinh đâm dô cái màn trinh con đĩ mẹ m đó 🧐🧐-)))) {name}",
    "gà v em =))) {name}",
    "(=< cái con chó nhiễm phóng xạ bày đặt ửa bố cười vl  {name}",
    "đừng để t nguyền rủa mà=))) chứ t đã rủa thì đầu con mẹ m búa bổ làm hai 🧐 {name}",
    "speed tí đi con đĩ 🤣 {name}",
    "hoảng loạn ak e =)) 🤪👈🏻👊🏻 {name}",
    "sao ấy cn ngu =((((👊🏻👊🏻 {name}",
    "dừng = con mẹ mày die nha em {name} 🤪🤞",
    "con đĩ đú {name} cay t hả🤣🤣",
    "cho an cut cay 🤣🤣 {name}",
  "sua de 🤣🤣 {name}",
  "cho bu cut🤣🤣👌{name}",
  "hang hai de :)) {name}",
  "cham do 🤣🤣 {name}",
  "oc dai cay r🤣🤣 {name}",
  "an hai phat bieu le de 🤣🤣 {name}",
  "oc dai :)))🤌 {name}",
  "on phai k? {name}",
  "ngu on 🤣🤣👌 {name}",
  "cho an cut 🐶 {name}",
  "dai du :)))) {name}",
  "yeu du ta😏😏 {name}",
  "con cho dan👉🤣 {name}",
  "on du chua =))) {name}",
  "run on da :))) {name}",
  "oc du 🤣🤣 {name}",
  "roi xong 🤢🤢 {name}",
  "co the hang ko a  {name}",
  "em cay doai =))) {name}",
  "cay tuot buoi 👉🤣{name}",
  "ei ei =)) {name}",
  "em ei :3 {name}",
  "chay a {name}",
  "may so ha 🤢🤢 {name}",
  "coi em son kia🤣🤣 👌{name}",
  "lai ba a :))) {name}",
  "sao cham du {name}",
  "eo oyyy:3 {name}",
  "hu hu🤨 {name}",
  "sao uc che da 😏😏 {name}",
  "con nao cun bi chui kia 🤣🤣🐶 {name}",
  "mau de :)) {name}",
  "hang de :))) {name}",
  "sua mau de =)) {name}",
  "can cuu ko :)) {name}",
  "co di :3 {name}",
  "gang len de :))) {name}",
  "sua to len🤣🤣 {name}",
  "pho nong thon 🤢🤢 {name}",
  "oc cac tinh le =)))) {name}",
  "khoe ko 🤣🤣 {name}",
  "kkk {name}",
  "doi a🤣🐶👌 {name}",
  "an chua a 🤣🤣 {name}",
  "chua dk :))) {name}",
  "thay kem coi :)) {name}",
  "du cut kia :))) {name}",
  "eo oyyy:3 {name}",
  "co de 🤣🤣 {name}",
  "thay may do do :))) {name}",
  "con cave 🤣🤣 {name}",
  "manh len:))) {name}",
  "go manh len de:)) {name}",
  "thay ngai ngung z🤣🤘 {name}",
  "tu nhien de {name}",
  "met dk {name}",
  "cam m ngung {name}",
  "di dau dinh :))) {name}",
  "le de:)) {name}",
  "may lag a :)) {name}",
  "m tram cam a :))) {name}",
  "tam li ko vung a :)) {name}",
  "can thuoc a :)) {name}",
  "hap hoi ha🤣🤣 {name}",
  "kho tho dk :)) {name}",
  "can oxi ko :))) {name}",
  "may benh nang lam a :))) {name}",
  "tuot hung cha :))) {name}",
  "tnh ga :))) {name}",
  "sao cham chap v :)) {name}",
  "oc dai 🤣🤣 {name}",
  "lon cu con di do🤣🤣 {name}",
  "luu loat len de 🤣🤣 {name}",
  "khung da :))) {name}",
  "t manh lam phai ko a :))) {name}",
  ":))) nho meu a ae {name}",
  "m ngheo ma {name}",
  "so t lam a:3 {name}",
  "ha cu =))) {name}",
  "thay toi qua:)) {name}",
  "thuong em co gang🤢🤘 {name}",
  "ma ngu🤣🤣 {name}",
  ":)) 🤣🤣 {name}",
  "cay lam a :)) {name}",
  "nhat nhoe v a {name}",
  "ko cam hung de hang a :))) {name}",
  "xao lon a :))) {name}",
  "khoc dk :))) {name}",
  "cave tinh le phat bieu:)) {name}",
  "ra tin hieu de :))) {name}",
  "SOS con dai du 🤣🤣🤢 {name}",
  "o o o :))) {name}",
  "cho an cut :))) {name}",
  "cho du san 👌🐶 {name}",
  "ia ra mau r a :))) {name}",
  "ngheo k co nghi luc a:)) {name}",
  "phan khang de :))) t win a {name}",
  "kkk {name}",
  "m chet r a :))) {name}",
  "m ngheo ma em 😏🤣 {name}",
  "m them cut t ma:)) {name}",
  "di me m ngu ma👉🤣 {name}",
  "m cay tao ma :)) {name}",
  "con oc cut thoi🤢🤢 {name}",
  "con di mat chim🤪🤪 {name}",
  "om han a 🤨 {name}",
  "con di nha nui :))) {name}",
  "bede bong lo =)) {name}",
  "cn di me may {name}",
  "tao tu hinh me m ma :)) {name}",
  "tk phe vat an hai😏🤘 {name}",
  "du don ha con :)) {name}",
  "m sao do {name}",
  "sua ne  {name}",
  "123 sua😏 {name}",
  "le ne  {name}",
  "alo alo hu hu  {name}",
  "th cam thu {name}",
  "m s da  {name}",
  "m so me ha  {name}",
  "len di me ko giet cha ma m dau ma 😏 {name}",
  "hu :)) {name}",
  "bat on ho {name}",
  "s do  {name}",
  "m rot kia th ga🤪 {name}",
  "t cam m choi nhen {name}",
  "choi t giet cha ma m ne:))) {name}",
  "hang xiu le kaka🤢 {name}",
  "th dan  {name}",
  "len me bieu {name}",
  "k len t tuyet chung m nhen cn thu {name}",
  "m thich du ko da🤨 {name}",
  "ko rep = t win nhen  {name}",
  "cam chay nhen {name}",
  "m mau  {name}",
  "len day o o  {name}",
  "th ngu e {name}",
  "s a len day me sut m chet {name}",
  "m khoc a 👉🤣 {name}",
  "sua lien tuc o🤣🤣 {name}",
  "cau cuu lu du a  {name}",
  "suc dai no xem a {name}",
  "dai tham v? {name}",
  "cham v cn culi🤣🤣👌 {name}",
  "hoang loan a {name}",
  "bat on a 🤮🤮 {name}",
  "run a {name}",
  "chay a  {name}",
  "duoi a  {name}",
  "bai chua 👉😏 {name}",
  "sua mau🙄🙄👈 {name}",
  "manh dan len  {name}",
  "nhanh t cho co hoi cuu ma m ne {name}",
  "cam mach me {name}",
  "ao war ho :)) {name}",
  "don ko  {name}",
  "dua ne len san t chap😏👌 {name}",
  "th cho bua m sao v {name}",
  "th dau buoi mat cho😢🫵🏻👈🏻 {name}",
  "cam hoang loan {name}",
  "lai phai win nua a🙄🙄 {name}",
  "kkk 🤪🤞 {name}"
];

const soMessages = [
    "# tr ơi mày gõ nguyên 1 tràn lan đại hải mà gõ chả ra cái hệ thống phèn lồn gì ht mà mày cũng gõ gõ như đường ray hay cái mê cung của nhà mày hay như bộ não ngắn của mày nó lắc léo mà mày lên đáp từng ngôn từng chữ của anh mà mày cũng chậm như rùa bò hả cn thú anh treo thủ cấp gái mẹ mày lên làm não gác bếp anh cho phò đi thay nhau húp rột rột mà mày lên đây mày xảo biện hả cn ôn thú gõ như đống tàn phế của gia đình nó từ thời nhà tống tời h là đủ đầy để anh đổ xuống sông nin anh rửa tội cho cả gia đình mày mà {name} ",
    "# con ôn lồn nào réo tao bước ra đây địt mẹ con ngáo dái này hãm cứt bấu buồi à mà réo tên t miết thế?Tao dùng xe tăng đứt vào mồm cho mày nín họng nhé?cầm nhân cách mày ra để tao chùi đít còn để tao giựt tóc mày chùi buổi cho tao con đĩ tai ương nghiệp chướng đầy mình thân xác khác đéo gì một con chó mà cứ réo tao thế?Loại như mày một phát là chị đây đá mày vào thẳng cái bụng bầu mẹ mày đấy?có phải lồn mày bị chó gặm xog liệt mẹ não rồi không?Con lồn ba hoa xàm địt như mày cứ dổng mõm chó lên mà vỗ ngực xưng danh với tao?ủa sao làm người đéo muốn muốn làm chó thế đi war mẹ mày khinh nhất mấy cái thành phần dơ bẩn ngu ngục như mày đấy chửi nhau vẫn tam táp nhảy vào mà vướng mắc cái lông lồn con ranh con nhảy đổng nói câu ẳng ẳng của mày để tao dìm chết cụ mày xuống 18 tầng địa ngục liếm lồn ma nữ treo ngược đầu con thú hoang thân tàn ma dại của mày lên cho thiên hạ chỉ trích con hãm cặc như mày con nghiệt súc bị tao dẫm đạp con quái thai quái thú nửa người nửa chó thế mà mở cái mõm ra chó này chó kia con khùng lồn xía mõm để tao sục chết tổ cụ nhà mày đi chứ con nghiệp chướng nứng lồn quá nói tao tao dẫn mày ra cột điện rồi đưa cái lồn mày vô đụ cho hết nứng chứ nứng lồn quá vậy ngồi đéo ai động đến lông lồn nào của mày mà cứ ngông mõm chó lên cắn như thế?Dập em như loài hoa hồng nhỏ nhắn mảnh khảnh dập nát đời em như đời bạc phận của chị em thúy kiều dập lồn em như thúy kiều thấy kim trọng xách cặc chơi gay với trương sinh làm nhành hồng thúi hèn như cuộc đời lênh đênh của em ra đây diện kiến mẹ? {name} ",   
    "# sao ức chế hả mày gõ như đống tro tàn cốt mã gái mẹ mày được anh đào từ dưới hầm mã chôn dưới 1 lớp đất nguyên 1 cái quàn tài 3 dài 2 ngắn lên đây anh hỏa thiêu sát gái mẹ mày nè cn gà ảo ửa đú sớ mà gõ ko ra hệ thống gì ht v cn gà bại anh rõ mà đú xạo lồn gì mấy sớ ghẻ v hả con gà {name} ",
    "# mày nghĩ mày có thể ăn được tôi hả ông ơi bật giờ ông nhắc thêm con bồ bà già hay dòng họ tổ tiên ông ra đây cùng một lúc chứ đĩ mẹ ông ngồi ôm ba cái ngữ mà tôi tưởng đâu bà đuối tới nơi rồi bây giờ cũng muốn nương tay với ông lắm mà ông hăng quá trời rồi nên tôi phải gõ cho ông tế xuống sông luôn nè {name} ",
    "# đĩ thì cx có 3 7 loại đĩ như m thì đĩ j z t Địt lất phất như mưa rơi địt tơi bởi như bom đạn Địt lãng mạn như Romeo và Juliet Địt khoét cái lỗ sâu địt khắp cái lỗ bướm Địt đứng tim phổi địt cặp mắt nai Mà địt chai lỗ đít địt khít cái lỗ lồn Con đĩ mẹ mày mà tao địt con đĩ mẹ mày Như gà mái mổ giun như chó càn cắn dậu {name} ",
    "# Thằng cậu mày hiếp dâm tao bật cái cánh cửa Cho con mẹ mày nằm ngửa bửa nát tử cung Khai thông buồng trứng hứng full tinh trùng Địt bồi hồi cảm xúc địt như bánh đúc ra lò Địt như mấy con phò bên hồ Hoàn Kiếm Địt như mấy con điếm bên chợ Đồng Xuân Địt đằng chân mà lên đằng đầut Địt lất phất như mưa rơi địt tơi bởi như bom đạn Địt lãng mạn như Romeo và Juliet Địt khoét cái lỗ sâu địt khắp cái lỗ bướm Địt đứng tim phổi địt cặp mắt nai Mà địt chai lỗ đít địt khít cái lỗ lồn Con đĩ mẹ mày mà tao địt con đĩ mẹ mày Như gà mái mổ giun như chó càn cắn dậu thằng cậu mày hiếp dâm tao bật cái cánh cửa Cho con mẹ mày nằm ngửa bửa nát tử cung Khai thông buồng trứng hứng full tinh trùng Địt bồi hồi cảm xúc địt như bánh đúc ra lò địt như mấy con phò bên hồ Hoàn Kiếm Địt như mấy con điếm bên chợ Đồng Xuân Địt đằng chân mà lên đằng đầu t Địt lất phất như mưa rơi địt tơi bởi như bom đạn Địt lãng mạn như Romeo và Juliet Địt khoét cái lỗ sâu địt khắp cái lỗ bướm Địt đứng tim phổi địt cặp mắt nai Mà địt chai lỗ đít địt khít cái lỗ lồn Con đĩ mẹ mày mà tao địt con đĩ mẹ mày Như gà mái mổ giun như chó càn cắn dậu {name} ",
    "# mẹ mày bị tao cưỡng hiếp hôm qua ý mẹ mày còn đưa lồn chó liếm nữa ý con lộ link nữa ý xem không cái lồn mẹ mày thâm xì à {name} ",
    "# mày xảo biện 1 hồi là anh lấy nước anh rửa tội cho cả gia đình mày bằng nước thánh thiên liêng từ đầu nguồn bị anh đái lên não nè {name} ",
    "# sủa điên đi mà sủa hăng lên mới vui à thì ra mày là con quái vật bú cu của tao xong bắt con đĩ mẹ mày sục con cặc cho tao hả tk lồn cặc mày súc sinh kìa -)) {name} ",    
    "# dòng thứ con đĩ đầu thai chuối ôn chuối ngục năm xưa cho mày hốc tinh trùng nhiều quá rồi nên đâm ra mày hãm lồn Cái lồn con đĩ mẹ mày trên mạng thì gõ phím như một vị thần ra ngoài gặp tao chắc cái mặt xanh rờn như tàu lá chuối xách cái lồn chạy 8 kiếp. Bà già mày 1 phút nứng lồn mà đẻ ra con quái thai đầu trâu mặt ngựa não tôm như mày mà lại còn đéo biết dạy mày thì hôm nay để bố mày thay trời hành đạo để không tốn công bà già mày đẻ mày đau lồn. Dòng thứ súc vật đầu thai mà đòi sánh vai ngang với chị mày cứt chó mà cứ tưởng cục socola america đụng ai chứ đụng tao thì tao tông cho mày nát cái lồn văng 8 thước nhee con đĩ lồn bá dơ. Tính thì như con cave hạng phèn mà cứ tưởng mình là công chúa trông lâu đài nguy nga Cái lồn mẹ mày thứ cuồng dâm nên đâm ra hoang tưởng thì để tao kêu xe tông cho chột cái lồn mẹ mày luôn thứ đĩ như mày cho ăn xin còn không thèm đụ thì mày nghĩ mày là ai Coi chừng tạo nghiệp nhiều mốt đẻ con tàn tật thì lại khổ cái con đĩ mẹ mày nghe chưa. Tranh thủ kiếp này bớt đi nứng lồn dạo làm chị đại bàn phím để mà tích đức cho con cháu sau này nghe chưa ? Chị mày nói ít mong mày hiểu nhiều chứ cái loại ngu như mày thì đụ má nói nhiều hiểu cũng đéo được bao nhiêu. {name} ",    
    "# đái cu sửng văng vào mổm ăng khôn ra cần chi gặp chị em tự sử nc đái dơ thôi của bé dẹo bị bắt giữ và phát triển kinh nghiệm của các nhà khoa học công lập acc bot chs có j ăn cã 2 vợ chồng tôi cũng kiếm được nhiều người thì 10 mấy triệu USD để mua acc khác mà không cần phải có một người bạn của bạn sẽ có tiền mua nhà ở nhà ở xã hội sủa và có nhiều đâu mà mua acc khác mà không cần phải văn phòng phẩm sách cái bao tử đó có cả những người khác thích điều kiện mua bán nhà riêng tư của anh ấy có một số hình ảnh vậy cẻn có j ăn hết một mình trong tích xưa cùng tham khảo đc phép bị phạt tù từ từ sẽ mất bã nhờn và mụn có một người bạn của mình kiếm sống bằng nghề của bà làm việc tại các thứ cần anh lo am bờ sông Hồng Liên quân đội quần lót của em đâu có gì là không được phép nghe lời em nói em không biết có phải em đã uống thuốc an thần chr có kìa sao ko ạ em cảm thấy rất vui vẻ và hạnh phúc và thành công chúa nhỏ mà không cần thiết để em đi tắm đây cũng ko biết bé nó có tác 7 1 lần nữa lại về nhà r thoải mái đi ý nghĩa của anh ta lại có mất cái vậy mà anh t t là sao hả bạn thân của em đâu {name} ",  
    "# tr ơi mày gõ sớ sao bâyh mày qua mày nhây có dòng z hả anh cấm mày nhây mà mày gõ sớ từ đây đến tối cho anh anh mà thấy mày câm là anh phán tội chết cho cả dòng họ mày {name} ",
    "# đụ con đĩ mẹ mày nhắm tao làm chi thì mày về mày hỏi con gái mẹ mày đó đụ má cái cỡ như nó ôm giấc mộng đánh bại được tao  nên sai mày lên đây để cho mày chửi rủa tao mà mày cũng khôn làm được {name} ",          
    "# ngôn anh như đinh đóng cột còn mày con khỉ đột dựa cột mà nge mà:)))) {name} ",    
    "# tại đây sẽ là cái hố t đào để chôn cả gia đình m mà em 🤣👉 {name} ",    
];

function getLunarTodayString() {
    const now = new Date();
    const options = { timeZone: 'Asia/Ho_Chi_Minh' };
    const lunarDate = now.toLocaleDateString('vi-VN-u-ca-chinese', options);
    const [day, month, year] = lunarDate.split('/');
    return `Hôm nay là ngày ${day} (âm lịch),`;
}

const causieu = [
    " Nam mô A Di Đà Phật! 🙏 {name} ",
    " Con kính lạy chư Phật mười phương, chư vị Bồ Tát, chư vị Hiền Thánh Tăng. ",
    " Con kính lạy Đức Phật A Di Đà. ",
    " Con kính lạy Đức Quan Thế Âm Bồ Tát. ",
    " Con kính lạy chư vị Hộ Pháp và chư vị Thần Linh. ",
    lunarDateText,
    " Tín chủ con là Winter. ",
    " Thành tâm sửa biện hương hoa, lễ vật kính dâng lên Tam Bảo và chư vị Bồ Tát.",
    `Cúi xin chư vị Phật, Bồ Tát từ bi thương xót, chứng giám lòng thành, tiếp dẫn hương linh {name}
Sớm được siêu sinh về cõi lành, thoát khỏi khổ đau, nghiệp chướng.`,
    " Cầu xin Tam Bảo gia hộ, ban phúc lành cho gia đình chúng con được bình an, hạnh phúc, mọi việc hanh thông.",
    " Nam mô A Di Đà Phật! 🙏 {name} ",
];
function getVietnamTime() {
    return new Date().toLocaleTimeString('vi-VN', { hour12: false });
}

async function sendMessage(channelId, content) {
    try {
        const data = {
            content: content,
            embeds: [{
                description: `\`\`\`css\n${content}\`\`\``,
            }],
        };

        await axios.post(`https://discord.com/api/v9/channels/${channelId}/messages`, data, {
            headers: { Authorization: TOKEN, 'Content-Type': 'application/json' }
        });

        console.log(`[${getVietnamTime()}] Đã gửi: ${content}`);
    } catch (error) {
        console.error(`Lỗi khi gửi tin nhắn đến kênh ${channelId}:`, error.response?.data || error.message);
    }
}

client.on('messageCreate', async (message) => {
    if (!ADMIN_IDS.includes(message.author.id)) { 
        if (!notifiedUsers.has(message.author.id)) {
            notifiedUsers.add(message.author.id); 
        }
        return; 
    }

    const args = message.content.split(' ');

    if (args[0] === '!treo') {
        if (args.length < 2) {
            message.channel.send('CP Không đúng vd: !treo van.txt');
            return;
        }

        const fileName = args[1];
        if (!fs.existsSync(fileName)) {
            message.channel.send('Không tìm thấy file.');
            return;
        }

        spamChannel = message.channel.id;
        spamContent = fs.readFileSync(fileName, 'utf-8').replace(/"/g, ''); 
        spamming = true;

        await sendMessage(spamChannel, '✅️ Treo');

        while (spamming) {
            await sendMessage(spamChannel, spamContent);
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    if (args[0] === '!so') {
        if (args.length < 2) {
            message.channel.send('ko tag rồi réo ai má');
            return;
        }

        let name = args.slice(1).join(' ');
        spamChannel = message.channel.id;
        spamming = true;
        spamIndex = 0;

        while (spamming) {
            let content = soMessages[spamIndex].replace('{name}', name);
            await sendMessage(spamChannel, content);
            spamIndex = (spamIndex + 1) % soMessages.length;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    if (args[0] === '!nhay') {
        if (args.length < 2) {
            message.channel.send('ko tag rồi réo ai má');
            return;
        }

        let name = args.slice(1).join(' ');
        spamChannel = message.channel.id;
        spamming = true;
        spamIndex = 0;

        while (spamming) {
            let content = '# ' +  spamMessages[spamIndex].replace('{name}', name);
            await sendMessage(spamChannel, content);
            spamIndex = (spamIndex + 1) % spamMessages.length;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }
    if (args[0] === '!nhay1') {
        if (args.length < 2) {
            message.channel.send('ko tag rồi nhây ai má');
            return;
        }

        let name = args.slice(1).join(' ');
        spamChannel = message.channel.id;
        spamming = true;
        spamIndex = 0;

        while (spamming) {
            let content = causieu[spamIndex].replace('{name}', name);
            await sendMessage(spamChannel, content);
            spamIndex = (spamIndex + 1) % causieu.length;
            await new Promise(resolve => setTimeout(resolve, 2000));
        }
    }

    if (message.content.trim() === '!stop') {
        spamming = false;
        message.channel.send('=))))');
    }
});

client.on('ready', () => {
    console.log(`[${getVietnamTime()}] ${client.user.tag} đã đăng nhập thành công!`);
});

client.login(TOKEN);


const Jimp = require("jimp");

const ORIGINAL_IMAGE = __dirname + "/cau-rong-da-nang.jpeg";

const LOGO = __dirname + "/React-icon.svg.png";

//save image name
const FILENAME = "create-project-laravel5_8-using-composer-01.jpg";

const main = async (a) => {

    const [image, logo] = await Promise.all([
        Jimp.read(a),
        Jimp.read(LOGO)
    ]);

    // Resize logo
    const desiredLogoWidth = 100; // Độ rộng mong muốn của logo (đơn vị pixel)
    const desiredLogoHeight = Jimp.AUTO; // Để tự động tính toán chiều cao dựa trên tỷ lệ của hình ảnh
    logo.resize(desiredLogoWidth, desiredLogoHeight);

    // Tính toán vị trí của logo (ở trên cùng bên phải)
    const logoX = image.bitmap.width - logo.bitmap.width - 10; // Độ lệch từ mép phải của hình ảnh
    const logoY = 10; // Độ lệch từ mép trên của hình ảnh

    return image.composite(logo, logoX, logoY, [
        {
            mode: Jimp.BLEND_SCREEN,
            opacitySource: 0.1,
            opacityDest: 1
        }
    ]);
};

main(ORIGINAL_IMAGE).then(image => image.write(FILENAME));

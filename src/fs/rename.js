import fs from 'fs';
import path from "path";
const rename = async () => {
    const folderPath = 'src/fs/files';

    const oldFileName = 'wrongFilename.txt';
    const oldFilePath = path.join(folderPath, oldFileName);

    const newFileName = 'properFilename.md';
    const newFilePath = path.join(folderPath, newFileName);

    const fileExist = await fs.promises.access(oldFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

    const newFileExist = await fs.promises.access(newFilePath, fs.constants.F_OK)
        .then(() => true)
        .catch(() => false);

    if (!fileExist || newFileExist) {
        throw new Error('FS operation failed. File does not exist or target file already exists.')
    }

    try {
        await fs.promises.rename(oldFilePath, newFilePath);
        console.log('File renamed successfully!');
    } catch (err) {
        throw new Error(`FS operation failed. ${err.message}`);
    }

};

await rename().catch((err) => {
    console.log(err);
}) ;
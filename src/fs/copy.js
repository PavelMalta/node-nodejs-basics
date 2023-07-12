import path from 'path';
import fs from 'fs';

const copy = async () => {
    const folderPath = 'src/fs/files1';
    const destinationPath = path.join(path.dirname(folderPath), 'files_copy');

    try {
        const mainFolderExists = await fs.promises.access(folderPath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);
        const destinationExists = await fs.promises.access(destinationPath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        if (!mainFolderExists) {
            throw new Error('The folder being copied does not exist');
        }

        if (destinationExists) {
            throw new Error('Destination folder already exists');
        }

        await fs.promises.mkdir(destinationPath);
        const files = await fs.promises.readdir(folderPath);

        for (const file of files) {
            const sourceFile = path.join(folderPath, file);
            const destinationFile = path.join(destinationPath, file);

            await fs.promises.copyFile(sourceFile, destinationFile);
        }

        console.log('Folder copied successfully!');

    } catch (err) {
        throw new Error ('FS operation failed: ' + err.message);
    }
};

await copy().catch(err => {
    console.log(err.message);
});

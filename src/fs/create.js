import fs from 'fs';
import path from 'path';

const create = async () => {

    const folderPath = 'src/fs/files';
    const filePath = path.join(folderPath, 'fresh.txt');

    try {
        const fileExists = await fs.promises.access(filePath, fs.constants.F_OK)
            .then(() => true)
            .catch(() => false);

        if (fileExists) {
            throw new Error('File already exists.')
        }

        await fs.promises.mkdir(folderPath, { recursive: true });
        await fs.promises.writeFile(filePath, 'I am fresh and young');
        console.log('Fie created successfully!');
    } catch (error) {
        throw new Error(`FS operation failed. ${error.message}`);
    }
};

await create().catch(err => {
    console.log(err.message);
});
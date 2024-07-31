const path = require('path');
const fs = require('fs');

module.exports.reader = (req, res, next) => {
  const { folderType, folderName, fileName } = req.params;
  const imagePath = path.join(path.dirname(require.main.filename), 'public', 'assets', folderType, folderName, fileName);

  if (fs.existsSync(imagePath)) {
    res.type('image/webp');
    res.sendFile(imagePath);
  } else {
    res.status(404).json({ message: 'Image not found' });
  }
};

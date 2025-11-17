// Barcode generator utility
export const generateBarcode = (data, width = 200, height = 50) => {
  // Create a simple barcode pattern using Code 128 encoding principles
  const canvas = document.createElement('canvas');
  canvas.width = width;
  canvas.height = height;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, width, height);
  
  // Generate barcode pattern
  ctx.fillStyle = 'black';
  const barWidth = width / (data.length * 8);
  
  for (let i = 0; i < data.length; i++) {
    const char = data.charCodeAt(i) % 128;
    const pattern = getBarcodePattern(char);
    
    for (let j = 0; j < pattern.length; j++) {
      if (pattern[j] === '1') {
        ctx.fillRect(
          (i * 8 + j) * barWidth,
          5,
          barWidth,
          height - 15
        );
      }
    }
  }
  
  // Add text below barcode
  ctx.fillStyle = 'black';
  ctx.font = '10px monospace';
  ctx.textAlign = 'center';
  ctx.fillText(data, width / 2, height - 2);
  
  return canvas.toDataURL();
};

// Simple barcode pattern generator (Code 128 subset)
const getBarcodePattern = (charCode) => {
  const patterns = {
    48: '11011001100', // 0
    49: '11001101100', // 1
    50: '11001100110', // 2
    51: '10010011000', // 3
    52: '10010001100', // 4
    53: '10001001100', // 5
    54: '10011001000', // 6
    55: '10011000100', // 7
    56: '10001100100', // 8
    57: '11001001000', // 9
    65: '11010001100', // A
    66: '11000101100', // B
    67: '11000100110', // C
    68: '10110011100', // D
    69: '10011011100', // E
    70: '10011001110', // F
    71: '10111001000', // G
    72: '10011101000', // H
    73: '10011100100', // I
    74: '11001110010', // J
    75: '11001011100', // K
    76: '11001001110', // L
    77: '11011100100', // M
    78: '11001110100', // N
    79: '11101101110', // O
    80: '11101001100', // P
    81: '11100101100', // Q
    82: '11100100110', // R
    83: '11101100100', // S
    84: '11100110100', // T
    85: '11100110010', // U
    86: '11011011000', // V
    87: '11011000110', // W
    88: '11000110110', // X
    89: '10100011000', // Y
    90: '10001011000'  // Z
  };
  
  return patterns[charCode] || '11001001100'; // Default pattern
};

// QR Code generator utility (simplified)
export const generateQRCode = (data, size = 100) => {
  // Create a simple QR code pattern
  const canvas = document.createElement('canvas');
  canvas.width = size;
  canvas.height = size;
  const ctx = canvas.getContext('2d');
  
  // Clear canvas
  ctx.fillStyle = 'white';
  ctx.fillRect(0, 0, size, size);
  
  // Generate QR pattern (simplified grid pattern)
  ctx.fillStyle = 'black';
  const moduleSize = size / 25; // 25x25 grid
  
  // Create pattern based on data hash
  let hash = 0;
  for (let i = 0; i < data.length; i++) {
    hash = ((hash << 5) - hash + data.charCodeAt(i)) & 0xffffffff;
  }
  
  for (let row = 0; row < 25; row++) {
    for (let col = 0; col < 25; col++) {
      // Create pseudo-random pattern based on data hash and position
      const seed = hash + row * 25 + col;
      if ((seed % 3) === 0) {
        ctx.fillRect(
          col * moduleSize,
          row * moduleSize,
          moduleSize,
          moduleSize
        );
      }
    }
  }
  
  // Add finder patterns (corners)
  const finderSize = moduleSize * 7;
  
  // Top-left finder pattern
  ctx.fillStyle = 'black';
  ctx.fillRect(0, 0, finderSize, finderSize);
  ctx.fillStyle = 'white';
  ctx.fillRect(moduleSize, moduleSize, finderSize - 2 * moduleSize, finderSize - 2 * moduleSize);
  ctx.fillStyle = 'black';
  ctx.fillRect(2 * moduleSize, 2 * moduleSize, finderSize - 4 * moduleSize, finderSize - 4 * moduleSize);
  
  // Top-right finder pattern
  ctx.fillStyle = 'black';
  ctx.fillRect(size - finderSize, 0, finderSize, finderSize);
  ctx.fillStyle = 'white';
  ctx.fillRect(size - finderSize + moduleSize, moduleSize, finderSize - 2 * moduleSize, finderSize - 2 * moduleSize);
  ctx.fillStyle = 'black';
  ctx.fillRect(size - finderSize + 2 * moduleSize, 2 * moduleSize, finderSize - 4 * moduleSize, finderSize - 4 * moduleSize);
  
  // Bottom-left finder pattern
  ctx.fillStyle = 'black';
  ctx.fillRect(0, size - finderSize, finderSize, finderSize);
  ctx.fillStyle = 'white';
  ctx.fillRect(moduleSize, size - finderSize + moduleSize, finderSize - 2 * moduleSize, finderSize - 2 * moduleSize);
  ctx.fillStyle = 'black';
  ctx.fillRect(2 * moduleSize, size - finderSize + 2 * moduleSize, finderSize - 4 * moduleSize, finderSize - 4 * moduleSize);
  
  return canvas.toDataURL();
};

// NFC data formatter
export const formatNFCData = (studentData) => {
  return {
    type: 'student_id',
    id: studentData.id,
    admissionNo: studentData.admissionNo,
    name: `${studentData.firstName} ${studentData.lastName}`,
    class: studentData.class,
    level: studentData.level,
    schoolCode: 'EDUOS2024',
    timestamp: Date.now()
  };
};

// Generate attendance scan data
export const generateAttendanceData = (student, scanType = 'qr') => {
  const baseData = {
    type: 'attendance_scan',
    studentId: student.id,
    admissionNo: student.admissionNo,
    class: student.class,
    level: student.level,
    scanType: scanType,
    timestamp: Date.now(),
    schoolCode: 'EDUOS2024'
  };
  
  if (scanType === 'barcode') {
    return `EDU${student.admissionNo}${new Date().getFullYear()}`;
  } else if (scanType === 'qr') {
    return JSON.stringify(baseData);
  } else {
    return baseData;
  }
};
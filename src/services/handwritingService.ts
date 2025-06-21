// Enhanced Handwriting Generation Service with Real Font Support
interface GenerationRequest {
  text: string;
  style: string;
  background?: string;
  fontSize?: number;
  lineHeight?: number;
}

interface GenerationResponse {
  imageUrl: string;
  processingTime: number;
  success: boolean;
}

// Google Fonts configuration for different tiers
export const FONT_COLLECTIONS = {
  free: {
    cursive: [
      { id: 'dancing-script', name: 'Dancing Script', family: 'Dancing Script' },
      { id: 'great-vibes', name: 'Great Vibes', family: 'Great Vibes' }
    ],
    printed: [
      { id: 'roboto', name: 'Roboto', family: 'Roboto' },
      { id: 'open-sans', name: 'Open Sans', family: 'Open Sans' },
      { id: 'lato', name: 'Lato', family: 'Lato' }
    ]
  },
  premium: {
    cursive: [
      { id: 'dancing-script', name: 'Dancing Script', family: 'Dancing Script' },
      { id: 'great-vibes', name: 'Great Vibes', family: 'Great Vibes' },
      { id: 'pacifico', name: 'Pacifico', family: 'Pacifico' },
      { id: 'kaushan-script', name: 'Kaushan Script', family: 'Kaushan Script' },
      { id: 'allura', name: 'Allura', family: 'Allura' },
      { id: 'satisfy', name: 'Satisfy', family: 'Satisfy' },
      { id: 'alex-brush', name: 'Alex Brush', family: 'Alex Brush' },
      { id: 'pinyon-script', name: 'Pinyon Script', family: 'Pinyon Script' },
      { id: 'league-script', name: 'League Script', family: 'League Script' },
      { id: 'tangerine', name: 'Tangerine', family: 'Tangerine' },
      { id: 'cookie', name: 'Cookie', family: 'Cookie' },
      { id: 'marck-script', name: 'Marck Script', family: 'Marck Script' },
      { id: 'shadows-into-light', name: 'Shadows Into Light', family: 'Shadows Into Light' },
      { id: 'indie-flower', name: 'Indie Flower', family: 'Indie Flower' },
      { id: 'caveat', name: 'Caveat', family: 'Caveat' }
    ],
    printed: [
      { id: 'roboto', name: 'Roboto', family: 'Roboto' },
      { id: 'open-sans', name: 'Open Sans', family: 'Open Sans' },
      { id: 'lato', name: 'Lato', family: 'Lato' },
      { id: 'montserrat', name: 'Montserrat', family: 'Montserrat' },
      { id: 'source-sans-pro', name: 'Source Sans Pro', family: 'Source Sans Pro' },
      { id: 'raleway', name: 'Raleway', family: 'Raleway' },
      { id: 'ubuntu', name: 'Ubuntu', family: 'Ubuntu' },
      { id: 'nunito', name: 'Nunito', family: 'Nunito' },
      { id: 'poppins', name: 'Poppins', family: 'Poppins' },
      { id: 'inter', name: 'Inter', family: 'Inter' }
    ]
  }
};

export const PAPER_BACKGROUNDS = {
  free: [
    { id: 'lined', name: 'Lined Paper', preview: 'bg-gradient-to-br from-blue-50 to-blue-100' },
    { id: 'plain', name: 'Plain White', preview: 'bg-white' },
    { id: 'grid', name: 'Grid Paper', preview: 'bg-gradient-to-br from-gray-50 to-gray-100' }
  ],
  premium: [
    { id: 'lined', name: 'Lined Paper', preview: 'bg-gradient-to-br from-blue-50 to-blue-100' },
    { id: 'plain', name: 'Plain White', preview: 'bg-white' },
    { id: 'grid', name: 'Grid Paper', preview: 'bg-gradient-to-br from-gray-50 to-gray-100' },
    { id: 'vintage', name: 'Vintage Parchment', preview: 'bg-gradient-to-br from-yellow-50 to-amber-100' },
    { id: 'notebook', name: 'Spiral Notebook', preview: 'bg-gradient-to-br from-blue-50 to-indigo-100' },
    { id: 'legal', name: 'Legal Pad', preview: 'bg-gradient-to-br from-yellow-100 to-yellow-200' },
    { id: 'graph', name: 'Graph Paper', preview: 'bg-gradient-to-br from-green-50 to-green-100' },
    { id: 'dotted', name: 'Dotted Paper', preview: 'bg-gradient-to-br from-purple-50 to-purple-100' }
  ]
};

class HandwritingService {
  private loadedFonts = new Set<string>();

  // Load Google Fonts dynamically
  private async loadGoogleFont(fontFamily: string): Promise<void> {
    if (this.loadedFonts.has(fontFamily)) return;

    const fontUrl = `https://fonts.googleapis.com/css2?family=${encodeURIComponent(fontFamily)}:wght@400;700&display=swap`;
    
    return new Promise((resolve, reject) => {
      const link = document.createElement('link');
      link.href = fontUrl;
      link.rel = 'stylesheet';
      link.onload = () => {
        this.loadedFonts.add(fontFamily);
        resolve();
      };
      link.onerror = reject;
      document.head.appendChild(link);
    });
  }

  // Generate realistic handwriting on canvas
  private async generateHandwritingCanvas(
    text: string, 
    fontFamily: string, 
    background: string,
    fontSize: number = 24
  ): Promise<string> {
    // Load the font first
    await this.loadGoogleFont(fontFamily);
    
    // Wait for font to load
    await new Promise(resolve => setTimeout(resolve, 200));

    const canvas = document.createElement('canvas');
    canvas.width = 800;
    canvas.height = 600;
    const ctx = canvas.getContext('2d');
    
    if (!ctx) throw new Error('Canvas context not available');

    // Draw background
    this.drawBackground(ctx, canvas, background);
    
    // Set font properties
    ctx.font = `${fontSize}px "${fontFamily}", cursive`;
    ctx.fillStyle = '#2c3e50';
    ctx.textBaseline = 'top';
    
    // Add slight variations for realistic handwriting
    const lines = text.split('\n');
    let y = 60;
    const lineHeight = fontSize * 1.5;
    
    lines.forEach((line, lineIndex) => {
      if (y > canvas.height - 100) return; // Don't overflow
      
      let x = 60;
      const words = line.split(' ');
      
      words.forEach((word, wordIndex) => {
        // Add natural variations
        const xVariation = (Math.random() - 0.5) * 3;
        const yVariation = (Math.random() - 0.5) * 2;
        const rotation = (Math.random() - 0.5) * 0.02;
        
        ctx.save();
        ctx.translate(x + xVariation, y + yVariation);
        ctx.rotate(rotation);
        ctx.fillText(word, 0, 0);
        ctx.restore();
        
        // Calculate word width for spacing
        const wordWidth = ctx.measureText(word + ' ').width;
        x += wordWidth;
        
        // Line wrap
        if (x > canvas.width - 100) {
          x = 60;
          y += lineHeight;
        }
      });
      
      y += lineHeight;
    });
    
    return canvas.toDataURL('image/png');
  }

  private drawBackground(ctx: CanvasRenderingContext2D, canvas: HTMLCanvasElement, background: string) {
    // Clear canvas
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    
    switch (background) {
      case 'lined':
        ctx.fillStyle = '#f8f9ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Draw lines
        ctx.strokeStyle = '#e0e5ff';
        ctx.lineWidth = 1;
        for (let y = 60; y < canvas.height; y += 36) {
          ctx.beginPath();
          ctx.moveTo(50, y);
          ctx.lineTo(canvas.width - 50, y);
          ctx.stroke();
        }
        
        // Red margin line
        ctx.strokeStyle = '#ffcccb';
        ctx.lineWidth = 1;
        ctx.beginPath();
        ctx.moveTo(80, 0);
        ctx.lineTo(80, canvas.height);
        ctx.stroke();
        break;
        
      case 'grid':
        ctx.fillStyle = '#fafafa';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        ctx.strokeStyle = '#e5e5e5';
        ctx.lineWidth = 0.5;
        
        // Vertical lines
        for (let x = 30; x < canvas.width; x += 30) {
          ctx.beginPath();
          ctx.moveTo(x, 0);
          ctx.lineTo(x, canvas.height);
          ctx.stroke();
        }
        
        // Horizontal lines
        for (let y = 30; y < canvas.height; y += 30) {
          ctx.beginPath();
          ctx.moveTo(0, y);
          ctx.lineTo(canvas.width, y);
          ctx.stroke();
        }
        break;
        
      case 'vintage':
        const gradient = ctx.createLinearGradient(0, 0, canvas.width, canvas.height);
        gradient.addColorStop(0, '#fef7d3');
        gradient.addColorStop(1, '#f4e4bc');
        ctx.fillStyle = gradient;
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Add texture
        ctx.fillStyle = 'rgba(139, 101, 8, 0.05)';
        for (let i = 0; i < 100; i++) {
          const x = Math.random() * canvas.width;
          const y = Math.random() * canvas.height;
          const size = Math.random() * 3;
          ctx.fillRect(x, y, size, size);
        }
        break;
        
      case 'notebook':
        ctx.fillStyle = '#f0f4ff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
        
        // Spiral holes
        ctx.fillStyle = '#ddd';
        for (let y = 40; y < canvas.height; y += 60) {
          ctx.beginPath();
          ctx.arc(25, y, 8, 0, Math.PI * 2);
          ctx.fill();
        }
        
        // Lines
        ctx.strokeStyle = '#c5d4ff';
        ctx.lineWidth = 1;
        for (let y = 60; y < canvas.height; y += 36) {
          ctx.beginPath();
          ctx.moveTo(50, y);
          ctx.lineTo(canvas.width - 20, y);
          ctx.stroke();
        }
        break;
        
      default:
        ctx.fillStyle = '#ffffff';
        ctx.fillRect(0, 0, canvas.width, canvas.height);
    }
  }

  // Main generation method
  async generateHandwriting(request: GenerationRequest): Promise<GenerationResponse> {
    const startTime = Date.now();
    
    try {
      console.log('🎨 Starting handwriting generation...', request);
      
      // Find the font family from our collections
      const allFonts = [
        ...FONT_COLLECTIONS.free.cursive,
        ...FONT_COLLECTIONS.free.printed,
        ...FONT_COLLECTIONS.premium.cursive,
        ...FONT_COLLECTIONS.premium.printed
      ];
      
      const selectedFont = allFonts.find(font => font.id === request.style);
      const fontFamily = selectedFont ? selectedFont.family : 'Roboto';
      
      // Generate the handwriting image
      const imageUrl = await this.generateHandwritingCanvas(
        request.text,
        fontFamily,
        request.background || 'lined',
        request.fontSize || 24
      );
      
      const processingTime = Date.now() - startTime;
      console.log(`✅ Generation completed in ${processingTime}ms`);
      
      return {
        imageUrl,
        processingTime,
        success: true
      };
    } catch (error) {
      console.error('❌ Handwriting generation failed:', error);
      return {
        imageUrl: '',
        processingTime: Date.now() - startTime,
        success: false
      };
    }
  }

  // Export functionality
  async exportImage(imageUrl: string, format: 'png' | 'jpg' | 'pdf', isPremium: boolean = false): Promise<void> {
    if (format === 'pdf' && !isPremium) {
      throw new Error('PDF export is a premium feature');
    }

    if (format === 'pdf') {
      try {
        // For PDF export (premium only)
        const jsPDF = (await import('jspdf')).default;
        const pdf = new jsPDF();
        
        const img = new Image();
        img.crossOrigin = 'anonymous';
        
        return new Promise((resolve, reject) => {
          img.onload = () => {
            try {
              const canvas = document.createElement('canvas');
              const ctx = canvas.getContext('2d');
              if (ctx) {
                canvas.width = img.width;
                canvas.height = img.height;
                ctx.drawImage(img, 0, 0);
                
                const imgData = canvas.toDataURL('image/jpeg', 0.95);
                pdf.addImage(imgData, 'JPEG', 10, 10, 190, 0);
                pdf.save('handwriting.pdf');
                resolve();
              } else {
                reject(new Error('Canvas context not available'));
              }
            } catch (error) {
              reject(error);
            }
          };
          
          img.onerror = () => reject(new Error('Failed to load image'));
          img.src = imageUrl;
        });
      } catch (error) {
        console.error('PDF export failed:', error);
        throw new Error('PDF export failed. Please try again.');
      }
    } else {
      // For PNG/JPG export
      const link = document.createElement('a');
      link.href = imageUrl;
      link.download = `handwriting.${format}`;
      document.body.appendChild(link);
      link.click();
      document.body.removeChild(link);
    }
  }
}

export const handwritingService = new HandwritingService();

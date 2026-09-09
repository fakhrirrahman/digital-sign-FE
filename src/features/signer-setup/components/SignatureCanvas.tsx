import React, { useRef, useState, useEffect } from 'react';
import { Eraser } from 'lucide-react';

interface SignatureCanvasProps {
  onSave: (file: File) => void;
}

export function SignatureCanvas({ onSave }: SignatureCanvasProps) {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const [isDrawing, setIsDrawing] = useState(false);
  const [isEmpty, setIsEmpty] = useState(true);

  // Initialize canvas context settings
  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    // Set higher resolution for retina displays
    const rect = canvas.getBoundingClientRect();
    canvas.width = rect.width * 2;
    canvas.height = rect.height * 2;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    ctx.scale(2, 2);
    ctx.lineCap = 'round';
    ctx.lineJoin = 'round';
    ctx.strokeStyle = '#000000';
    ctx.lineWidth = 3;
    
    // Fill white background so it's not transparent
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
  }, []);

  const getCoordinates = (e: React.MouseEvent | React.TouchEvent) => {
    const canvas = canvasRef.current;
    if (!canvas) return { x: 0, y: 0 };
    
    const rect = canvas.getBoundingClientRect();
    let clientX, clientY;
    
    if ('touches' in e) {
      clientX = e.touches[0].clientX;
      clientY = e.touches[0].clientY;
    } else {
      clientX = (e as React.MouseEvent).clientX;
      clientY = (e as React.MouseEvent).clientY;
    }
    
    return {
      x: clientX - rect.left,
      y: clientY - rect.top
    };
  };

  const startDrawing = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault(); // Prevent scrolling on touch
    setIsDrawing(true);
    setIsEmpty(false);
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.beginPath();
    ctx.moveTo(x, y);
  };

  const draw = (e: React.MouseEvent | React.TouchEvent) => {
    e.preventDefault();
    if (!isDrawing) return;
    
    const ctx = canvasRef.current?.getContext('2d');
    if (!ctx) return;
    
    const { x, y } = getCoordinates(e);
    ctx.lineTo(x, y);
    ctx.stroke();
  };

  const stopDrawing = () => {
    setIsDrawing(false);
  };

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    
    const ctx = canvas.getContext('2d');
    if (!ctx) return;
    
    const rect = canvas.getBoundingClientRect();
    ctx.fillStyle = '#ffffff';
    ctx.fillRect(0, 0, rect.width, rect.height);
    ctx.beginPath();
    setIsEmpty(true);
  };

  const handleSave = () => {
    if (isEmpty || !canvasRef.current) return;
    
    canvasRef.current.toBlob((blob) => {
      if (blob) {
        const file = new File([blob], `signature_${Date.now()}.png`, { type: 'image/png' });
        onSave(file);
      }
    }, 'image/png');
  };

  return (
    <div className="flex flex-col gap-unit-sm w-full h-full">
      <div className="relative w-full aspect-video bg-white rounded-xl border-2 border-dashed border-outline-variant overflow-hidden cursor-crosshair">
        <canvas
          ref={canvasRef}
          className="w-full h-full touch-none"
          onMouseDown={startDrawing}
          onMouseMove={draw}
          onMouseUp={stopDrawing}
          onMouseOut={stopDrawing}
          onTouchStart={startDrawing}
          onTouchMove={draw}
          onTouchEnd={stopDrawing}
        />
        {isEmpty && (
          <div className="absolute inset-0 pointer-events-none flex items-center justify-center text-outline">
            <span className="font-label-sm opacity-50">Goreskan tanda tangan Anda di sini</span>
          </div>
        )}
      </div>
      
      <div className="flex gap-unit-sm">
        <button
          type="button"
          onClick={clearCanvas}
          className="py-unit-xs px-unit-sm bg-surface-container hover:bg-surface-container-high text-on-surface rounded-lg font-label-sm text-label-sm transition-colors flex items-center gap-1"
        >
          <Eraser size={16} />
          <span>Hapus</span>
        </button>
        
        <button
          type="button"
          onClick={handleSave}
          disabled={isEmpty}
          className="flex-1 py-unit-xs bg-primary text-on-primary rounded-lg font-label-md text-label-md font-bold hover:bg-primary/90 disabled:opacity-50 transition-colors"
        >
          Gunakan Goresan Ini
        </button>
      </div>
    </div>
  );
}

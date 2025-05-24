import React, { useState, useRef, useEffect } from 'react';
import { anatomyStatusData } from '../../data/mockData';

// Import the human anatomy image
import anatomyImage from '../../assets/human-anatomy.png';

// Custom scrollbar styles
const scrollbarStyles = {
  scrollbarWidth: 'thin',
  scrollbarColor: '#CBD5E1 transparent',
};

const AnatomyStatus = () => {
  const [hoveredPart, setHoveredPart] = useState(null);
  const [tooltipPosition, setTooltipPosition] = useState({ x: 0, y: 0 });
  const imageRef = useRef(null);
  const [imageSize, setImageSize] = useState({ width: 0, height: 0 });

  // Define the coordinates for each body part (x, y, width, height) - percentages of the image dimensions
  const bodyParts = {
    // External body parts
    'Head': { x: 50, y: 7, width: 12, height: 10 },
    'Neck': { x: 50, y: 17, width: 6, height: 3 },
    'Chest': { x: 50, y: 25, width: 28, height: 15 },
    'Left Arm': { x: 30, y: 30, width: 10, height: 25 },
    'Right Arm': { x: 70, y: 30, width: 10, height: 25 },
    'Stomach': { x: 50, y: 40, width: 20, height: 10 },
    'Left Leg': { x: 43, y: 60, width: 7, height: 35 },
    'Right Leg': { x: 57, y: 60, width: 7, height: 35 },
    
    // Organs and internal body parts
    'Heart': { x: 47, y: 27, width: 10, height: 8 },
    'Lungs': { x: 50, y: 25, width: 24, height: 12 },
    'Teeth': { x: 50, y: 14, width: 8, height: 2 },
    'Bone': { x: 50, y: 50, width: 6, height: 20 },
    'Liver': { x: 43, y: 35, width: 10, height: 8 },
    'Kidneys': { x: 50, y: 38, width: 16, height: 6 },
    'Brain': { x: 50, y: 5, width: 10, height: 6 },
    'Intestines': { x: 50, y: 45, width: 16, height: 10 },
  };

  // Function to determine badge class based on status
  const getStatusClass = (status) => {
    switch (status) {
      case 'Healthy':
        return 'bg-green-500 border-green-500';
      case 'Critical':
        return 'bg-red-500 border-red-500';
      case 'Stable':
        return 'bg-yellow-500 border-yellow-500';
      default:
        return 'bg-gray-400 border-gray-400';
    }
  };

  const handlePartHover = (part, e) => {
    if (part) {
      setHoveredPart(part);
      // Position tooltip near the cursor
      const rect = e.target.getBoundingClientRect();
      setTooltipPosition({ 
        x: e.clientX, 
        y: e.clientY 
      });
    } else {
      setHoveredPart(null);
    }
  };

  const getPartDetails = (partName) => {
    return anatomyStatusData.find(item => item.name.toLowerCase() === partName.toLowerCase());
  };
  
  // Function to check if a part exists in anatomyStatusData
  const partExistsInData = (partName) => {
    return anatomyStatusData.some(item => item.name.toLowerCase() === partName.toLowerCase());
  };

  // Calculate the position of the highlight box based on image size
  const calculateHighlightPosition = (part) => {
    if (!imageRef.current) return {};
    
    const img = imageRef.current;
    const imgRect = img.getBoundingClientRect();
    const imgWidth = imgRect.width;
    const imgHeight = imgRect.height;
    
    const partData = bodyParts[part];
    if (!partData) return {};
    
    // Calculate position as percentages of the actual displayed image size
    // Adjust for centering by subtracting half the width/height
    return {
      left: `calc(${partData.x}% - ${partData.width / 2}%)`,
      top: `calc(${partData.y}% - ${partData.height / 2}%)`,
      width: `${partData.width}%`,
      height: `${partData.height}%`,
    };
  };

  // Handle image load to get its natural dimensions
  const handleImageLoad = () => {
    if (imageRef.current) {
      setImageSize({
        width: imageRef.current.naturalWidth,
        height: imageRef.current.naturalHeight
      });
    }
  };

  return (
    <div className="w-full">
      <div className="flex flex-col sm:flex-row justify-between items-start sm:items-center mb-4 sm:mb-6">
        <h2 className="text-lg sm:text-xl font-semibold text-gray-800 mb-2 sm:mb-0">Human Anatomy Status</h2>
        <button className="text-sm text-primary font-medium hover:underline focus:outline-none focus:ring-2 focus:ring-primary/50 rounded">
          View Details
        </button>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
        <div className="lg:col-span-2 bg-white rounded-xl shadow-sm p-4 sm:p-6">
          <div className="relative w-full h-[32rem] mx-auto overflow-hidden rounded-lg">
            <div className="relative w-full h-full">
              <img
                ref={imageRef}
                src={anatomyImage}
                alt="Human Anatomy"
                className="w-full h-full object-contain"
                onLoad={handleImageLoad}
                onMouseLeave={() => setHoveredPart(null)}
              />
              
              {/* Highlight overlays for each body part */}
              {Object.keys(bodyParts).map((partName) => {
                // Check if this part exists in our data
                if (!partExistsInData(partName)) return null;
                
                const part = getPartDetails(partName);
                const statusClass = getStatusClass(part?.status || 'Unknown');
                const highlightStyle = calculateHighlightPosition(partName);
                const isHovered = hoveredPart === partName;
                
                return (
                  <div
                    key={partName}
                    className={`absolute ${isHovered ? 'border-4 z-10' : 'border-2'} ${statusClass} ${isHovered ? 'opacity-50' : 'opacity-0 hover:opacity-40'} transition-all duration-200 cursor-pointer rounded-md`}
                    style={{
                      ...highlightStyle,
                      transform: isHovered ? 'scale(1.05)' : 'scale(1)',
                      boxShadow: isHovered ? '0 0 8px rgba(255,255,255,0.7)' : 'none'
                    }}
                    onMouseEnter={(e) => handlePartHover(partName, e)}
                    onMouseLeave={() => setHoveredPart(null)}
                    onClick={() => setHoveredPart(hoveredPart === partName ? null : partName)}
                  />
                );
              })}
              
              {/* Tooltip */}
              {hoveredPart && (
                <div 
                  className="absolute bg-white shadow-lg rounded-lg p-3 text-sm z-10 pointer-events-none transition-all duration-200"
                  style={{
                    left: `${tooltipPosition.x}px`,
                    top: `${tooltipPosition.y}px`,
                    transform: 'translate(-50%, -120%)',
                    minWidth: '160px',
                    maxWidth: '200px'
                  }}
                >
                  <div className="font-semibold text-gray-800 flex items-center">
                    <span className={`w-2 h-2 rounded-full mr-2 ${getStatusClass(getPartDetails(hoveredPart)?.status)}`}></span>
                    {hoveredPart}
                  </div>
                  <div className="text-xs text-gray-500 mt-1">
                    Status: {getPartDetails(hoveredPart)?.status}
                  </div>
                  <div className="text-xs text-gray-600 mt-1">
                    {getPartDetails(hoveredPart)?.details}
                  </div>
                </div>
              )}
              
              {/* Details Box in Bottom Left */}
              <div className="absolute bottom-4 left-4 bg-white/95 shadow-lg rounded-lg p-4 w-64 border border-gray-200 transition-all duration-300 ease-in-out"
                   style={{ 
                     opacity: hoveredPart ? 1 : 0.7,
                     transform: hoveredPart ? 'translateY(0)' : 'translateY(10px)'
                   }}>
                <h4 className="font-medium text-gray-800 text-sm mb-2">
                  {hoveredPart ? (
                    <div className="flex items-center">
                      <span className={`w-3 h-3 rounded-full mr-2 ${getStatusClass(getPartDetails(hoveredPart)?.status)}`}></span>
                      {hoveredPart}
                    </div>
                  ) : 'Hover over a body part'}
                </h4>
                
                {hoveredPart ? (
                  <div className="space-y-2">
                    <div className="flex items-center justify-between">
                      <span className="text-xs font-medium text-gray-500">Status:</span>
                      <span className="text-xs font-semibold text-gray-800">{getPartDetails(hoveredPart)?.status}</span>
                    </div>
                    
                    <div>
                      <span className="text-xs font-medium text-gray-500 block mb-1">Details:</span>
                      <p className="text-xs text-gray-700 leading-relaxed">{getPartDetails(hoveredPart)?.details || 'No details available'}</p>
                    </div>
                    
                    {getPartDetails(hoveredPart)?.icon && (
                      <div className="text-right">
                        <span className="text-2xl">{getPartDetails(hoveredPart)?.icon}</span>
                      </div>
                    )}
                  </div>
                ) : (
                  <p className="text-xs text-gray-500">Hover over or click on a body part to see detailed information</p>
                )}
              </div>
            </div>
          </div>
        </div>
        
        {/* Status Legend */}
        <div className="space-y-4">
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <div className="flex justify-between items-center mb-3">
              <h3 className="font-medium text-gray-800">Body Parts Status</h3>
              <span className="text-xs text-gray-500">{anatomyStatusData.length} parts</span>
            </div>
            {/* Fixed height container to show only 4 items at a time */}
            <div className="h-[220px] overflow-y-auto pr-1" style={scrollbarStyles}>
              <div className="space-y-2">
                {anatomyStatusData.map((item) => (
                  <div 
                    key={item.id}
                    className="flex items-center p-2 rounded-lg hover:bg-gray-50 cursor-pointer transition-colors border border-transparent hover:border-gray-100"
                    onMouseEnter={(e) => handlePartHover(item.name, e)}
                    onMouseLeave={() => setHoveredPart(null)}
                    onClick={() => setHoveredPart(hoveredPart === item.name ? null : item.name)}
                  >
                    <div className={`w-3 h-3 rounded-full mr-3 ${getStatusClass(item.status)}`}></div>
                    <div className="flex-1">
                      <div className="text-sm font-medium text-gray-800">{item.name}</div>
                      <div className="text-xs text-gray-500">{item.status}</div>
                    </div>
                    <div className="text-lg">{item.icon}</div>
                  </div>
                ))}
              </div>
            </div>
          </div>
          
          <div className="bg-white rounded-xl shadow-sm p-4 sm:p-6">
            <h3 className="font-medium text-gray-800 mb-3">Status Legend</h3>
            <div className="space-y-2">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-green-500 mr-2"></div>
                <span className="text-sm text-gray-700">Healthy - No issues detected</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm text-gray-700">Stable - Monitor condition</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm text-gray-700">Critical - Needs attention</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnatomyStatus;

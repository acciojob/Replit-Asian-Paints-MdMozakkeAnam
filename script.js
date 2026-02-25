//your JS code here. If required.
document.addEventListener('DOMContentLoaded', function() {
            const changeButton = document.getElementById('change_button');
            const resetButton = document.getElementById('Reset');
            const blockIdInput = document.getElementById('block_id');
            const colorIdInput = document.getElementById('colour_id');
            const blockError = document.getElementById('block-error');
            const colorError = document.getElementById('color-error');

            // Change color functionality
            changeButton.addEventListener('click', function() {
                const blockId = parseInt(blockIdInput.value);
                const colorName = colorIdInput.value.trim().toLowerCase();
                
                // Validate inputs
                if (isNaN(blockId) || blockId < 1 || blockId > 9) {
                    showError(blockError, true);
                    return;
                }
                
                if (!colorName || !isValidColor(colorName)) {
                    showError(colorError, true);
                    return;
                }
                
                // Reset all grids to transparent first
                resetAllGrids();
                
                // Change specific grid color
                const targetGrid = document.querySelector(`[data-id="${blockId}"]`);
                if (targetGrid) {
                    targetGrid.style.backgroundColor = colorName;
                    targetGrid.style.color = 'white'; // Better contrast
                }
                
                // Clear errors
                showError(blockError, false);
                showError(colorError, false);
            });

            // Reset functionality
            resetButton.addEventListener('click', function() {
                resetAllGrids();
                blockIdInput.value = '1';
                colorIdInput.value = '';
                showError(blockError, false);
                showError(colorError, false);
            });

            // Helper functions
            function resetAllGrids() {
                const allGrids = document.querySelectorAll('.grid-item');
                allGrids.forEach(grid => {
                    grid.style.backgroundColor = 'transparent';
                    grid.style.color = '#2c3e50';
                });
            }

            function showError(errorElement, show) {
                errorElement.style.display = show ? 'block' : 'none';
            }

            function isValidColor(color) {
                // Common color names that work with CSS
                const validColors = [
                    'red', 'blue', 'green', 'yellow', 'orange', 'purple', 'pink', 
                    'brown', 'black', 'white', 'gray', 'grey', 'cyan', 'magenta',
                    'lime', 'navy', 'teal', 'olive', 'maroon', 'silver', 'gold'
                ];
                return validColors.includes(color);
            }

            // Allow Enter key to trigger change
            blockIdInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') changeButton.click();
            });
            colorIdInput.addEventListener('keypress', function(e) {
                if (e.key === 'Enter') changeButton.click();
            });
        });
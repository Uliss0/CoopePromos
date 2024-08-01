
const searchSliderAsync = async () => {
    try {
        const response = await fetch('/mocks/slider.json');
        if (!response.ok) {
            throw new Error('Network response was not ok');
        }
        const data = await response.json();
        const arr = Object.values(data)[0];
        return arr
    } catch (e) {
        throw new Error('Error searching: ' + e.message);
    }
};

export default searchSliderAsync

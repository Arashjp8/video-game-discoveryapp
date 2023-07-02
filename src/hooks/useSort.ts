import Game from "../interfaces/Game";

const useSort = (unsortedGames: Game[], sortOption: string) => {
  let sortedGames: Game[] = unsortedGames;

  const dateMergeSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const middle = Math.floor(array.length / 2);
    const left = array.slice(0, middle);
    const right = array.slice(middle);

    const merge = (left: Game[], right: Game[]) => {
      let result = [];
      let i = 0;
      let j = 0;

      while (i < left.length && j < right.length) {
        if (new Date(left[i].released) > new Date(right[j].released)) {
          result.push(left[i]);
          i++;
        } else {
          result.push(right[j]);
          j++;
        }
      }

      while (i < left.length) {
        result.push(left[i]);
        i++;
      }

      while (j < right.length) {
        result.push(right[j]);
        j++;
      }

      return result;
    };

    return merge(dateMergeSort(left), dateMergeSort(right));
  };

  const nameQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].name < pivot.name) {
        left.push(array[i]);
      } else if (array[i].name > pivot.name) {
        right.push(array[i]);
      }
    }
    dateMergeSort(unsortedGames);
    return [...nameQuickSort(left), pivot, ...nameQuickSort(right)];
  };

  const ratingQuickSort = (array: Game[]): Game[] => {
    if (array.length <= 1) {
      return array;
    }

    const pivot = array[Math.floor(array.length / 2)];
    const left: Game[] = [];
    const right: Game[] = [];

    for (let i = 0; i < array.length; i++) {
      if (array[i].rating > pivot.rating) {
        left.push(array[i]);
      } else if (array[i].rating < pivot.rating) {
        right.push(array[i]);
      }
    }

    return [...ratingQuickSort(left), pivot, ...ratingQuickSort(right)];
  };

  if (sortOption === "release-date") {
    sortedGames = dateMergeSort(unsortedGames);
  }

  if (sortOption === "name") {
    sortedGames = nameQuickSort(unsortedGames);
  }

  if (sortOption === "rating") {
    sortedGames = ratingQuickSort(unsortedGames);
  }

  return sortedGames;
};

export default useSort;

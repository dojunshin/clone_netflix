import { create } from 'zustand'

const useModalStore = create((set) => ({
  show: false,
  selectedMovie: null, // 선택된 영화 저장
  open: (movie) => {
    set({ show: true, selectedMovie: movie }) // 영화 정보와 함께 모달 열기
  },
    close: () => set({ show: false, selectedMovie: null }),     // 닫을 땐 초기화
}))
export default useModalStore 
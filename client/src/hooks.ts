import { TypedUseSelectorHook, useDispatch, useSelector } from "react-redux";
import type { RootState, AppDispatch } from "./store";

// Правильний кастомний хук для dispatch
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Правильний кастомний хук для selector
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// import { useDispatch, useSelector } from "react-redux";
// import type { RootState, AppDispatch } from "./store";

// export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
// export const useAppSelector = useSelector.withTypes<RootState>();

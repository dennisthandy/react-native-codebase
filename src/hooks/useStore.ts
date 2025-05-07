import { useDispatch, useSelector } from 'react-redux';
import { AppDispatch, StoreState } from '../store';

export const useAppDispatch = useDispatch.withTypes<AppDispatch>();
export const useAppSelector = useSelector.withTypes<StoreState>();

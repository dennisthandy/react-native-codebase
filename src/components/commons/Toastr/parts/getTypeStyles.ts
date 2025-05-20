import { colors } from '@/src/constants/colors.constants';

export default function getTypeStyles(type: Toast['type']) {
  switch (type) {
    case 'success':
      return {
        backgroundColor: colors.support.success[500],
        iconName: 'checkmark-circle',
      };
    case 'error':
      return {
        backgroundColor: colors.support.error[500],
        iconName: 'alert-circle',
      };
    case 'warning':
      return {
        backgroundColor: colors.support.warning[500],
        iconName: 'warning',
      };
    case 'info':
      return {
        backgroundColor: colors.support.info[500],
        iconName: 'information-circle',
      };
    default:
      return {
        backgroundColor: colors.neutral.background,
        iconName: 'information-circle',
      };
  }
}

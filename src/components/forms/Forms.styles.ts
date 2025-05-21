import { colors } from '@/src/constants/colors.constants';
import { TEXT_VARIANTS } from '@/src/constants/typography.constants';
import { StyleSheet } from 'react-native';

export default StyleSheet.create({
  container: {
    marginBottom: 16,
  },
  inputContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    borderWidth: 1,
    borderColor: colors.gray[100],
    borderRadius: 8,
    paddingHorizontal: 8,
    minHeight: 48,
    position: 'relative',
  },
  label: {
    marginBottom: 8,
  },
  input: {
    width: '100%',
    includeFontPadding: false,
    borderRadius: 8,
    ...TEXT_VARIANTS.body,
  },
  rightLabel: {
    height: '100%',
    borderTopRightRadius: 8,
    borderBottomRightRadius: 8,
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    position: 'absolute',
    right: 0,
    zIndex: 1,
  },
  leftLabel: {
    height: '100%',
    borderTopLeftRadius: 8,
    borderBottomLeftRadius: 8,
    textAlignVertical: 'center',
    paddingHorizontal: 8,
    marginLeft: -8,
  },
  errorText: {
    color: colors.support.error[500],
    marginTop: 4,
  },
  disabled: {
    backgroundColor: colors.gray[600],
    borderColor: colors.gray[600],
  },
});

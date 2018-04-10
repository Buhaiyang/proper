
import { message } from 'antd';

export function oopToast(response, succText, errText) {
  if (response.status === 'ok') {
    if (succText) {
      return message.success(succText);
    } else if (!succText && (typeof response.result === 'string') && response.result !== '') {
      return message.success(response.result);
    }
  }
  if (errText) {
    return message.error(errText);
  } else if (!errText && (typeof response.result === 'string') && response.result !== '') {
    return message.error(response.result);
  }
}
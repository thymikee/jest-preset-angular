import 'jest-preset-angular';
import './jestGlobalMocks';

// for example app testing only
import { getTestMode } from '../get-test-mode';
global['JpaTestMode'] = getTestMode()

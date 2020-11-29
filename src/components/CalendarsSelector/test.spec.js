import { render, screen, fireEvent } from '@testing-library/react';
import uuid from 'uuid/v4';
import faker from 'faker';
import CalendarsSelector from './index';

import { ThemeProvider } from '@material-ui/styles';
import theme from '../../theme';

const setSelectedCalendars = jest.fn();

const calendar1 = {
  id: uuid(),
  summary: faker.fake('{{name.firstName}} {{name.lastName}}'),
  backgroundColor: faker.internet.color(),
};
const calendar2 = {
  id: uuid(),
  summary: faker.internet.email(),
  backgroundColor: faker.internet.color(),
};

describe('<CalendarsSelector />', () => {
  afterEach(() => {
    setSelectedCalendars.mockClear();
  });

  describe('Structure', () => {
    const calendars = { [calendar1.id]: calendar1, [calendar2.id]: calendar2 };
    const selectedCalendars = { [calendar1.id]: true, [calendar2.id]: true };

    it('should have a title', () => {
      render(
        <ThemeProvider theme={theme}>
          <CalendarsSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            setSelectedCalendars={setSelectedCalendars}
          />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('calendar-selctor-title')).toBeInTheDocument();
    });

    it('should handle no calendars', () => {
      render(
        <ThemeProvider theme={theme}>
          <CalendarsSelector
            calendars={[]}
            selectedCalendars={{}}
            setSelectedCalendars={setSelectedCalendars}
          />
        </ThemeProvider>,
      );
      expect(screen.getByTestId('calendar-selctor-no-calendar')).toBeInTheDocument();
      expect(screen.queryByTestId('calendar-selctor-item')).not.toBeInTheDocument();
    });

    it('should have a two calendars items selected', async () => {
      render(
        <ThemeProvider theme={theme}>
          <CalendarsSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            setSelectedCalendars={setSelectedCalendars}
          />
        </ThemeProvider>,
      );

      const items = await screen.findAllByTestId('calendar-selctor-item');
      expect(items.length).toEqual(2);
      expect(items[0]).toHaveTextContent(calendar1.summary);
      expect(items[1]).toHaveTextContent(calendar2.summary);

      const dots = await screen.findAllByTestId('calendar-selctor-item-dot');
      expect(dots.length).toEqual(2);
      expect(dots[0]).toHaveStyle({
        backgroundColor: calendar1.backgroundColor,
      });
      expect(dots[1]).toHaveStyle({
        backgroundColor: calendar2.backgroundColor,
      });
    });

    it('should call setSelectedCalendars when a calendar is clicked (disable)', async () => {
      render(
        <ThemeProvider theme={theme}>
          <CalendarsSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            setSelectedCalendars={setSelectedCalendars}
          />
        </ThemeProvider>,
      );

      fireEvent.click(screen.getByText(calendars[0].summary));
      expect(setSelectedCalendars).toHaveBeenCalledWith({
        [calendar1.id]: false,
        [calendar2.id]: true,
      });
    });

    it('should call setSelectedCalendars when a calendar is clicked (enable)', async () => {
      const selectedCalendars = { [calendar1.id]: false, [calendar2.id]: true };
      render(
        <ThemeProvider theme={theme}>
          <CalendarsSelector
            calendars={calendars}
            selectedCalendars={selectedCalendars}
            setSelectedCalendars={setSelectedCalendars}
          />
        </ThemeProvider>,
      );

      fireEvent.click(screen.getByText(calendars[0].summary));
      expect(setSelectedCalendars).toHaveBeenCalledWith({
        [calendars[0].id]: true,
        [calendars[1].id]: true,
      });
    });
  });
});

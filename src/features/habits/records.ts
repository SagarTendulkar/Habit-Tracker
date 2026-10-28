import { DailyRecord } from "./types";

export default function toggleDailyRecord(
    records: DailyRecord[],
    habitId: string,
    date: string,
): DailyRecord[] {
    const existingRecord = records.find(
        (record) => record.habitId === habitId && record.date === date,
    );

    const now = new Date().toISOString();

    if (existingRecord) {
        return records.map((record) =>
            record.habitId === habitId && record.date === date
                ? {
                      ...record,
                      occurred: !record.occurred,
                      updatedAt: now,
                  }
                : record,
        );
    }

    const newRecord: DailyRecord = {
        id: `${habitId}-${date}`,
        habitId,
        date,
        occurred: true,
        createdAt: now,
        updatedAt: now,
    };
    return [...records, newRecord];
}

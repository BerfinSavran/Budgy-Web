import { Button, Dialog, DialogActions, DialogContent, DialogTitle, TextField, RadioGroup, FormControlLabel, Radio, FormControl, InputLabel, Select, MenuItem } from "@mui/material";
import { useState, useEffect } from "react";
import { format, parse, isValid } from "date-fns";
import CategoryService from "../services/CategoryService";

interface NewRecordDialogProps {
    open: boolean;
    onClose: () => void;
    onSubmit: (formValues: Record<string, any>) => void;
    formValues: Record<string, any>;
    setFormValues: (values: Record<string, any>) => void;
}

export default function NewRecordDialog({ open, onClose, onSubmit, formValues, setFormValues }: NewRecordDialogProps) {
    const [type, setType] = useState<"Gelir" | "Gider" | "Hedef">("Gelir");
    const [categories, setCategories] = useState<Array<{ id: string, name: string }>>([]);

    useEffect(() => {
        const fetchCategories = async () => {
            const userId = localStorage.getItem('userId');
            if (userId) {
                const inExType = type === "Gelir" ? 0 : 1;
                const categoriesData = await CategoryService.getAllByInExType(inExType, userId);
                setCategories(categoriesData);
            }
        };
        fetchCategories();
    }, [type]);

    const handleChange = (field: string, value: any) => {
        setFormValues((prev: any) => ({ ...prev, [field]: value }));
    };

    const handleSubmit = () => {
        onSubmit(formValues);
        onClose();
    };

    const handleDateChange = (date: string | null, field: string) => {
        if (date) {
            const parsedDate = parse(date, 'yyyy-MM-dd', new Date());
            if (isValid(parsedDate)) {
                handleChange(field, parsedDate);
            }
        } else {
            handleChange(field, null);
        }
    };

    const handleDateRangeChange = (startDate: string | null, endDate: string | null) => {
        if (!startDate && !endDate) return;

        let dateRange = [...(formValues.dateRange || [null, null])];
        
        if (startDate) {
            dateRange[0] = parse(startDate, 'yyyy-MM-dd', new Date());
        }
        if (endDate) {
            dateRange[1] = parse(endDate, 'yyyy-MM-dd', new Date());
        }

        if ((dateRange[0] && isValid(dateRange[0])) || (dateRange[1] && isValid(dateRange[1]))) {
            handleChange("dateRange", dateRange);
        }
    };

    return (
        <Dialog open={open} onClose={onClose}>
            <DialogTitle textAlign="center">Yeni Kayıt Ekle</DialogTitle>
            <DialogContent>
                {/* Radio Group for Gelir, Gider, Hedef */}
                <FormControl component="fieldset" margin="normal">
                    <RadioGroup
                        row
                        value={type}
                        onChange={(e) => {
                            const selectedType = e.target.value as "Gelir" | "Gider" | "Hedef";
                            setType(selectedType);
                            handleChange("type", selectedType);
                        }}
                    >
                        <FormControlLabel value="Gelir" control={<Radio />} label="Gelir" />
                        <FormControlLabel value="Gider" control={<Radio />} label="Gider" />
                        <FormControlLabel value="Hedef" control={<Radio />} label="Hedef" />
                    </RadioGroup>
                </FormControl>

                {/* Miktar Field */}
                <TextField
                    label="Miktar"
                    type="text"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleChange("amount", e.target.value)}
                />

                {/* Kategori Select */}
                <FormControl fullWidth margin="normal">
                    <InputLabel>Kategori</InputLabel>
                    <Select
                        value={formValues.category || ""}
                        onChange={(e) => handleChange("category", e.target.value)}
                    >
                        {categories.map((category) => (
                            <MenuItem key={category.id} value={category.id}>
                                {category.name}
                            </MenuItem>
                        ))}
                    </Select>
                </FormControl>

                {/* Tarih Field (DatePicker or DateRangePicker based on selection) */}
                {type === "Hedef" ? (
                    <>
                        <TextField
                            label="Başlangıç Tarihi"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={formValues.dateRange?.[0] ? format(formValues.dateRange[0], 'yyyy-MM-dd') : ''}
                            onChange={(e) => handleDateRangeChange(e.target.value, null)}
                        />
                        <TextField
                            label="Bitiş Tarihi"
                            type="date"
                            fullWidth
                            margin="normal"
                            InputLabelProps={{ shrink: true }}
                            value={formValues.dateRange?.[1] ? format(formValues.dateRange[1], 'yyyy-MM-dd') : ''}
                            onChange={(e) => handleDateRangeChange(null, e.target.value)}
                        />
                    </>
                ) : (
                    <TextField
                        label="Tarih"
                        type="date"
                        fullWidth
                        margin="normal"
                        InputLabelProps={{ shrink: true }}
                        onChange={(e) => handleDateChange(e.target.value, "date")}
                    />
                )}

                {/* Açıklama Field */}
                <TextField
                    label="Açıklama"
                    type="text"
                    fullWidth
                    margin="normal"
                    onChange={(e) => handleChange("description", e.target.value)}
                />
            </DialogContent>
            <DialogActions>
                <Button onClick={onClose}>Vazgeç</Button>
                <Button onClick={handleSubmit} variant="contained">Kaydet</Button>
            </DialogActions>
        </Dialog>
    );
}

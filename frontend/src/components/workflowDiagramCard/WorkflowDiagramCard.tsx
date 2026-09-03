import React from 'react';
import { Button, Dropdown, Alert } from 'mpa-design-system';
import './DownloadCard.css';

interface DownloadCardProps {
    selectedFormat: any;
    downloadStatus: any;
    validationError: string | null;
    downloadError: string | null;
    onFormatChange: (format: any) => void;
    onDownload: () => void;
}

const FORMAT_OPTIONS = [
    { value: 'json', label: 'JSON' },
    { value: 'csv',  label: 'CSV'  },
    { value: 'txt',  label: 'TXT'  },
];

const DownloadCard: React.FC<DownloadCardProps> = ({
    selectedFormat,
    downloadStatus,
    validationError,
    downloadError,
    onFormatChange,
    onDownload,
}) => {
    const isLoading = downloadStatus === 'loading';
    const isSuccess = downloadStatus === 'success';

    return (
        <div className="download-card">
            <h3 className="download-card__heading">Download as ZIP</h3>
            <p className="download-card__description">
                Choose a file format and download all your user stories as a ZIP archive.
            </p>

            <div className="download-card__field">
                <Dropdown
                    id="export-format-dropdown"
                    label="File Format"
                    options={FORMAT_OPTIONS}
                    selectedValue={selectedFormat ?? undefined}
                    onChange={(value) => onFormatChange(value as any)}
                    placeholder="Select a format…"
                    errorText={validationError ?? undefined}
                    disabled={isLoading}
                />
            </div>

            {downloadError && (
                <div className="download-card__alert">
                    <Alert
                        id="download-error-alert"
                        colour="error"
                        content={{
                            label: 'Download Failed',
                            message: downloadError,
                        }}
                    />
                </div>
            )}

            {isSuccess && (
                <div className="download-card__alert">
                    <Alert
                        id="download-success-alert"
                        colour="success"
                        content={{
                            label: 'Download Started',
                            message: 'Your ZIP file is being downloaded.',
                        }}
                    />
                </div>
            )}

            <div className="download-card__action">
                <Button
                    id="btn-download-zip"
                    colour="primary"
                    size="medium"
                    label={isLoading ? 'Downloading…' : 'Download as ZIP'}
                    disabled={isLoading}
                    onClick={onDownload}
                />
            </div>
        </div>
    );
};

export default DownloadCard;

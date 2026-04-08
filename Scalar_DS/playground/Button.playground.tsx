import React, { useState } from 'react';
import { Button } from '../ui_components/Button/Button';

/**
 * Button Playground
 * 
 * Interactive playground for testing the Button component with various configurations.
 * Includes controls for:
 * - Leading icon toggle
 * - Trailing icon toggle
 * - Button label text input
 * - Theme mode toggle (light/dark)
 */
export default function ButtonPlayground() {
  const [hasLeadingIcon, setHasLeadingIcon] = useState(false);
  const [hasTrailingIcon, setHasTrailingIcon] = useState(false);
  const [buttonLabel, setButtonLabel] = useState('Button');
  const [themeMode, setThemeMode] = useState<'light' | 'dark'>('light');

  // Simple icon component for demonstration
  const ChevronIcon = ({ className }: { className?: string }) => (
    <svg
      className={className}
      width="16"
      height="16"
      viewBox="0 0 16 16"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M4 6L8 10L12 6"
        stroke="currentColor"
        strokeWidth="2"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );

  return (
    <div
      className={`min-h-screen p-8 transition-colors duration-200 ${
        themeMode === 'light' ? 'bg-neutral-100' : 'bg-neutral-900'
      }`}
    >
      <div className="max-w-4xl mx-auto">
        <h1 className={`text-3xl font-bold mb-8 ${
          themeMode === 'light' ? 'text-neutral-900' : 'text-neutral-100'
        }`}>
          Button Component Playground
        </h1>

        {/* Controls */}
        <div
          className={`mb-8 p-6 rounded-m border ${
            themeMode === 'light'
              ? 'bg-white border-neutral-200'
              : 'bg-neutral-800 border-neutral-700'
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              themeMode === 'light' ? 'text-neutral-900' : 'text-neutral-100'
            }`}
          >
            Controls
          </h2>

          <div className="space-y-4">
            {/* Label Input */}
            <div>
              <label
                htmlFor="label-input"
                className={`block text-sm font-medium mb-2 ${
                  themeMode === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                }`}
              >
                Button Label
              </label>
              <input
                id="label-input"
                type="text"
                value={buttonLabel}
                onChange={(e) => setButtonLabel(e.target.value)}
                className={`w-full px-4 py-2 rounded-s border ${
                  themeMode === 'light'
                    ? 'bg-white border-neutral-300 text-neutral-900'
                    : 'bg-neutral-700 border-neutral-600 text-neutral-100'
                } focus:outline-none focus:ring-2 focus:ring-brand-500`}
                placeholder="Enter button label"
              />
            </div>

            {/* Leading Icon Toggle */}
            <div className="flex items-center">
              <input
                id="leading-icon-toggle"
                type="checkbox"
                checked={hasLeadingIcon}
                onChange={(e) => setHasLeadingIcon(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
              />
              <label
                htmlFor="leading-icon-toggle"
                className={`ml-2 text-sm ${
                  themeMode === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                }`}
              >
                Show Leading Icon
              </label>
            </div>

            {/* Trailing Icon Toggle */}
            <div className="flex items-center">
              <input
                id="trailing-icon-toggle"
                type="checkbox"
                checked={hasTrailingIcon}
                onChange={(e) => setHasTrailingIcon(e.target.checked)}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
              />
              <label
                htmlFor="trailing-icon-toggle"
                className={`ml-2 text-sm ${
                  themeMode === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                }`}
              >
                Show Trailing Icon
              </label>
            </div>

            {/* Theme Toggle */}
            <div className="flex items-center">
              <input
                id="theme-toggle"
                type="checkbox"
                checked={themeMode === 'dark'}
                onChange={(e) => setThemeMode(e.target.checked ? 'dark' : 'light')}
                className="w-4 h-4 text-brand-500 rounded focus:ring-brand-500"
              />
              <label
                htmlFor="theme-toggle"
                className={`ml-2 text-sm ${
                  themeMode === 'light' ? 'text-neutral-700' : 'text-neutral-300'
                }`}
              >
                Dark Theme
              </label>
            </div>
          </div>
        </div>

        {/* Button Preview */}
        <div
          className={`p-6 rounded-m border ${
            themeMode === 'light'
              ? 'bg-white border-neutral-200'
              : 'bg-neutral-800 border-neutral-700'
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              themeMode === 'light' ? 'text-neutral-900' : 'text-neutral-100'
            }`}
          >
            Preview
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              label={buttonLabel}
              leadingIcon={hasLeadingIcon ? <ChevronIcon /> : undefined}
              trailingIcon={hasTrailingIcon ? <ChevronIcon /> : undefined}
              themeMode={themeMode}
            />
          </div>
        </div>

        {/* Size Variants */}
        <div
          className={`mt-8 p-6 rounded-m border ${
            themeMode === 'light'
              ? 'bg-white border-neutral-200'
              : 'bg-neutral-800 border-neutral-700'
          }`}
        >
          <h2
            className={`text-xl font-semibold mb-4 ${
              themeMode === 'light' ? 'text-neutral-900' : 'text-neutral-100'
            }`}
          >
            Size Variants
          </h2>

          <div className="flex flex-wrap items-center gap-4">
            <Button
              label="Small"
              size="S"
              themeMode={themeMode}
              leadingIcon={hasLeadingIcon ? <ChevronIcon className="w-4 h-4" /> : undefined}
              trailingIcon={hasTrailingIcon ? <ChevronIcon className="w-4 h-4" /> : undefined}
            />
            <Button
              label="Medium"
              size="M"
              themeMode={themeMode}
              leadingIcon={hasLeadingIcon ? <ChevronIcon className="w-6 h-6" /> : undefined}
              trailingIcon={hasTrailingIcon ? <ChevronIcon className="w-6 h-6" /> : undefined}
            />
            <Button
              label="Large"
              size="L"
              themeMode={themeMode}
              leadingIcon={hasLeadingIcon ? <ChevronIcon className="w-7 h-7" /> : undefined}
              trailingIcon={hasTrailingIcon ? <ChevronIcon className="w-7 h-7" /> : undefined}
            />
          </div>
        </div>
      </div>
    </div>
  );
}


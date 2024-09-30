import NoRowMessage from '@/components/noRowMessage/NoRowMessage.component'
import { Theme, Typography, alpha } from '@mui/material'
import type { } from '@mui/x-data-grid/themeAugmentation'
import type { } from '@mui/x-date-pickers/themeAugmentation'



export const overridesComponent = (theme: Theme) => {
  return {
    MuiTypography: {
      defaultProps: {
        variantMapping: {
          display1: 'h2',
          subtitle: 'div'
        }
      }
    },
    MuiButton: {
      defaultProps: {
        disableElevation: true,
        variant: 'outlined',
      },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          textTransform: 'unset',
          ...(ownerState.variant === 'contained' && {
            color: '#fff',
            fontWeight: 400,
          })
        }),
        sizeLarge: theme.unstable_sx({
          py: 1.25,
          fontSize: 'body1.fontSize',
        }),
        contained: theme.unstable_sx({
          wordSpacing: 2
        }),
        rounded: theme.unstable_sx({
          py: 1,
          borderRadius: '50px',
          background: theme.palette.primary.main,
          color: theme.palette.primary.contrastText,
          '&:hover': {
            background: theme.palette.primary.dark,
            color: theme.palette.primary.contrastText,
          },
        }),
        roundedWhite: theme.unstable_sx({
          py: 1,
          borderRadius: '50px',
          background: theme.palette.background.bg1,
          color: theme.palette.text.primary,
          '&:hover': {
            background: theme.palette.background.bg1,
            color: theme.palette.primary.light,
          },
        })
      }
    },
    MuiTextField: {
      defaultProps: {
        fullWidth: true,
      },
    },
    MuiOutlinedInput: {
      styleOverrides: {
        notchedOutline: theme.unstable_sx({
          borderColor: 'dividerDark',
        }),
      }
    },
    MuiFormControl: {
      defaultProps: {
        fullWidth: true,
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '& > .MuiInputLabel-outlined': {
            '&.MuiInputLabel-shrink, &.MuiInputLabel-shrink ~ div > fieldset.MuiOutlinedInput-notchedOutline': {
              fontSize: `calc(${theme.typography.body1.fontSize} + 2px) !important`,
            }
          }
        })
      }
    },
    MuiCheckbox: {
      styleOverrides: {
        root: theme.unstable_sx({
          color: 'rgba(0,0,0,.5)'
        })
      }
    },
    MuiRadio: {
      styleOverrides: {
        root: theme.unstable_sx({
          color: 'rgba(0,0,0,.5)'
        })
      }
    },
    MuiAutocomplete: {
      defaultProps: {
        disableClearable: true,
        clearOnBlur: true,
        autoHighlight: true,
      }
    },
    MuiLink: {
      styleOverrides: {
        root: { cursor: 'pointer' }
      }
    },
    MuiPaper: {
      defaultProps: {
        elevation: 8
      }
    },
    MuiRating: {
      defaultProps: {
        precision: .5
      }
    },
    MuiSwitch: {
      styleOverrides: {
        thumb: theme.unstable_sx({
          boxShadow: '3',
        })
      }
    },
    MuiFormHelperText: {
      styleOverrides: {
        root: theme.unstable_sx({
          ':empty': {
            mt: 0
          },
          mx: 1.75,
          '&:not(.Mui-error)': {
            fontWeight: 500,
          }
        }),
      }
    },
    MuiInputAdornment: {
      styleOverrides: {
        root: theme.unstable_sx({
          fontSize: '1.375rem',
        })
      }
    },
    MuiChip: {
      defaultProps: {
        size: 'small',
      },
      styleOverrides: {
        sizeSmall: theme.unstable_sx({
          fontSize: 'body2.fontSize',
        }),
        sizeMedium: theme.unstable_sx({
          fontWeight: 500,
          color: 'text.secondary',
        })
      }
    },
    MuiFab: {
      defaultProps: { color: 'primary', size: 'small' },
      styleOverrides: {
        root: {
          boxShadow: 'unset'
        }
      }
    },
    MuiTab: {
      styleOverrides: {
        root: theme.unstable_sx({
          textTransform: 'unset'
        })
      }
    },
    MuiTooltip: {
      styleOverrides: {
        tooltip: theme.unstable_sx({
          fontSize: 'body2.fontSize',
          fontWeight: 300,
        })
      }
    },
    MuiAlert: {
      styleOverrides: {
        root: theme.unstable_sx({
          typography: 'body1'
        })
      }
    },
    MuiDialogContent: {
      styleOverrides: {
        root: theme.unstable_sx({
          p: 3
        })
      }
    },
    MuiDialogTitle: {
      defaultProps: {
        component: Typography,
        variant: 'h2',
      }
    },
    MuiDialogActions: {
      styleOverrides: {
        root: theme.unstable_sx({
          px: 3,
          py: 1.5,
        })
      }
    },
    MuiMenuItem: {
      styleOverrides: {
        root: theme.unstable_sx({
          '&.Mui-disabled': {
            opacity: .7
          }
        })
      }
    },
    MuiDataGrid: {
      defaultProps: {
        autoHeight: true,
        rowCount: 0,
        rowHeight: 40,
        columnHeaderHeight: 50,
        disableRowSelectionOnClick: true,
        disableColumnMenu: true,
        paginationMode: 'server',
        pageSizeOptions: [10, 25, 50, 100],
        slots: {
          noRowsOverlay: NoRowMessage
        },
        getRowClassName: (params: any) => params.indexRelativeToCurrentPage % 2 === 0 ? 'even-row' : 'odd-row'
      },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          color: 'text.secondary',
          bgcolor: 'background.default',
          wordBreak: 'break-word',
          display: 'grid',
          animation: 'fadeIn 0.4s forwards',
          '--DataGrid-rowBorderColor': theme.palette.divider,
          '&, .MuiDataGrid-withBorderColor': {
            borderColor: 'divider',
          },
          '.MuiDataGrid-columnSeparator': theme.unstable_sx({
            color: 'dividerDark'
          }),
          '.MuiDataGrid-columnHeaders > [role="row"]': {
            borderRadius: 1,
          },
          '.MuiDataGrid-columnHeader, .MuiDataGrid-cell, .MuiTablePagination-selectLabel, .MuiTablePagination-displayedRows': {
            outline: 'unset !important',
            fontSize: 'body1.fontSize',
            color: 'text.secondary',
            fontWeight: 400,
          },
          '.MuiDataGrid-columnHeader': {
            color: alpha(theme.palette.text.primary, .75),
          },
          '.MuiDataGrid-columnHeaderTitle': {
            lineHeight: 'var(--line-height)',
          },
          ...(!ownerState?.className?.includes('bordered-table') && {
            borderWidth: 0,
            borderRadius: 0,
            '--DataGrid-rowBorderColor': theme.palette.divider,
            '--DataGrid-overlayHeight': '300px',
            '.MuiDataGrid-columnHeader': {
              color: alpha(theme.palette.text.primary, .75),
            },
            '.MuiDataGrid-topContainer': {
              mb: '1px',
              '.MuiDataGrid-columnHeaders > [role="row"]': {
                bgcolor: 'background.bg2',
              },
              '&:after': {
                display: 'none',
              },
            },
            '.MuiDataGrid-main>*:first-of-type': {
              borderRadius: 0,
            },
          })
        }),
      },
    },
    MuiMobileDatePicker: {
      defaultProps: {
        slotProps: {
          toolbar: {
            sx: theme.unstable_sx({
              '.MuiDatePickerToolbar-title': {
                fontSize: '1.5rem'
              }
            })
          }
        }
      },
    },
    MuiMobileTimePicker: {
      defaultProps: {
        slotProps: {
          toolbar: {
            sx: theme.unstable_sx({
              '.MuiTimePickerToolbar-hourMinuteLabel .MuiPickersToolbarText-root': {
                fontSize: '2rem',
              },
              '.MuiTimePickerToolbar-ampmLabel.Mui-selected': {
                color: 'primary.main',
              }
            })
          }
        }
      },
    },
    MuiMobileDateTimePicker: {
      defaultProps: {
        slotProps: {
          toolbar: {
            sx: theme.unstable_sx({
              '.MuiPickersToolbarText-root.MuiTypography-h4': {
                fontSize: '1.5rem',
                color: 'text.primary',
              },
              '.MuiDateTimePickerToolbar-timeDigitsContainer .MuiPickersToolbarText-root': {
                fontSize: '2rem',
              },
              '.MuiDateTimePickerToolbar-timeDigitsContainer': {
                alignItems: 'center',
              },
              '.MuiDateTimePickerToolbar-ampmLabel.Mui-selected': {
                color: 'primary.main',
              }
            })
          }
        }
      }
    },
    MuiTabPanel: {
      styleOverrides: {
        root: theme.unstable_sx({
          p: 0
        })
      }
    },
    MuiPagination: {
      defaultProps: {
        shape: 'rounded',
        color: 'primary',
      },
      styleOverrides: {
        root: theme.unstable_sx({
          '.MuiPaginationItem-page': {
            fontSize: 'body1.fontSize'
          }
        })
      }
    },
    MuiCard: {
      defaultProps: {
        elevation: 0,
      },
      styleOverrides: {
        root: ({ ownerState }) => theme.unstable_sx({
          '--card-border-radius': '12px',
          width: 1,
          borderRadius: 'var(--card-border-radius)',
          overflow: 'hidden',
          border: 1,
          borderColor: 'divider',
          display: 'flex',
          flexFlow: 'column',
          transition: 'box-shadow .25s',
          bgcolor: 'background.default',
          ...(ownerState.elevation === 0 && {
            boxShadow: 'unset',
            ':hover': {
              boxShadow: '4'
            }
          })
        })
      }
    }
  } as Theme['components']
}


declare module '@mui/material/Button' {
  interface ButtonPropsVariantOverrides {
    rounded: true;
    roundedWhite: true;
  }
}
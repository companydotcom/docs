import cn from 'clsx'
import { Box, Button, HStack, Stack, Text, VStack } from '@vastly/ui'
import type { ReactElement, ReactNode } from 'react'
import { createContext, memo, useCallback, useContext, useState } from 'react'

const ctx = createContext(0)

function useIndent() {
  return useContext(ctx)
}

interface FolderProps {
  name: string
  label?: ReactElement
  open?: boolean
  defaultOpen?: boolean
  onToggle?: (open: boolean) => void
  children: ReactNode
  comment?: string;
  highlight?: boolean;
}

interface FileProps {
  name: string
  label?: ReactElement
  active?: boolean
  comment?: string
  highlight?: boolean
}

// Syntax highlighting
const hlStyles = {
  backgroundColor: "hsl(var(--nextra-primary-hue)100% 45%/.1)",
  color: "hsl(var(--nextra-primary-hue)100% 45%/.5)",
  "--tw-shadow": "2px 0 currentColor inset",
  "--tw-shadow-colored": "inset 2px 0 var(--tw-shadow-color)",
  boxShadow: "var(--tw-ring-offset-shadow,0 0 transparent),var(--tw-ring-shadow,0 0 transparent),var(--tw-shadow)",
  borderRadius: "none",
  minWidth: "100%"
}

function Tree({ children }: { children: ReactNode }): ReactElement {
  return (
    <Box
      className={cn(
        'nextra-filetree nx-mt-6 nx-select-none nx-text-sm nx-text-gray-800 dark:nx-text-gray-300',
        'nx-not-prose' // for nextra-theme-blog
      )}
      style={{
        paddingLeft: "1rem",
        paddingRight: "1rem"
      }}
    >
      <VStack className="nx-inline-block nx-rounded-lg nx-border nx-px-4 nx-py-2 dark:nx-border-neutral-800" display="grid" >
        {children}
      </VStack>
    </Box>
  )
}

function Ident(): ReactElement {
  const length = useIndent()
  return (
    <>
      {Array.from({ length }, (_, i) => (
        <span className="nx-w-5" key={i} />
      ))}
    </>
  )
}

const Folder = memo<FolderProps>(
  ({ label, name, open, children, defaultOpen = false, onToggle, comment, highlight }) => {
    const indent = useIndent()
    const [isOpen, setIsOpen] = useState(defaultOpen)

    const toggle = useCallback(() => {
      onToggle?.(!isOpen)
      setIsOpen(!isOpen)
    }, [isOpen, onToggle])

    const isFolderOpen = open === undefined ? isOpen : open

    return (
      <Box className="nx-flex nx-list-none nx-flex-col" >
        <Box
          onClick={toggle}
          title={name}
          className="nx-inline-flex nx-cursor-pointer nx-items-center nx-py-1 hover:nx-opacity-60"
          style={highlight ? hlStyles : null}
        >
          <Ident />
          <svg width="1em" height="1em" viewBox="0 0 24 24">
            <path
              fill="none"
              stroke="currentColor"
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d={
                isFolderOpen
                  ? 'M5 19a2 2 0 0 1-2-2V7a2 2 0 0 1 2-2h4l2 2h4a2 2 0 0 1 2 2v1M5 19h14a2 2 0 0 0 2-2v-5a2 2 0 0 0-2-2H9a2 2 0 0 0-2 2v5a2 2 0 0 1-2 2Z'
                  : 'M3 7v10a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V9a2 2 0 0 0-2-2h-6l-2-2H5a2 2 0 0 0-2 2Z'
              }
            />
          </svg>
          <Text className="nx-ml-1" color="#b392f0">{label ?? name}</Text>
        <Ident />
        {comment ? <Text color="gray.500" fontWeight="normal">{comment}</Text> :  null}
        </Box>
        {isFolderOpen && (
          <Box>
            <ctx.Provider value={indent + 1}>{children}</ctx.Provider>
          </Box>
        )}
      </Box>
    )
  }
)
Folder.displayName = 'Folder'

const File = memo<FileProps>(({ label, name, active, comment, highlight }) => (
  <Box
    className={cn(
      'nx-flex nx-list-none',
      active && 'nx-text-primary-600 contrast-more:nx-underline'
    )}
  >
    <Box className="nx-inline-flex nx-cursor-default nx-items-center nx-py-1" style={highlight ? hlStyles : null}>
      <Ident />
      <svg width="1em" height="1em" viewBox="0 0 24 24">
        <path
          fill="none"
          stroke="currentColor"
          strokeLinecap="round"
          strokeLinejoin="round"
          strokeWidth="2"
          d="M9 12h6m-6 4h6m2 5H7a2 2 0 0 1-2-2V5a2 2 0 0 1 2-2h5.586a1 1 0 0 1 .707.293l5.414 5.414a1 1 0 0 1 .293.707V19a2 2 0 0 1-2 2Z"
        />
      </svg>
      <Text className="nx-ml-1" color="#ffab70">{label ?? name}</Text>
      <Ident />
    {comment ? <Text color="gray.500">{comment}</Text> :  null}
    </Box>
  </Box>
))
File.displayName = 'File'

export { Tree as FileTree, Folder, File }
